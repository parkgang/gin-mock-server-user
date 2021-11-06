package handlers

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt"
	"github.com/parkgang/modern-board/internal/app/data/orm"
	"github.com/parkgang/modern-board/internal/app/entitys"
	"github.com/parkgang/modern-board/internal/app/models"
	"github.com/parkgang/modern-board/internal/pkg/auth"
	"github.com/parkgang/modern-board/internal/pkg/kakao"
	"github.com/parkgang/modern-board/internal/pkg/util"
)

type User struct {
	ID       uint64 `json:"id"`
	Username string `json:"username"`
	Password string `json:"password"`
	Phone    string `json:"phone"`
}

var user = User{
	ID:       1,
	Username: "username",
	Password: "password",
	Phone:    "49123454322",
}

// @Summary 회원가입
// @Description 사용자를 생성합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param data body models.UserSignUp true "회원가입을 위한 정보"
// @Success 201 {object} entitys.User
// @Header 201 {string} Location "/users/1"
// @Failure 400 {object} models.ErrResponse
// @Failure 409 {object} models.ErrResponse
// @Failure 500 {object} models.ErrResponse
// @Router /users/signup [post]
func UserSignup(c *gin.Context) {
	userBody := models.UserSignUp{}

	if err := c.BindJSON(&userBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	if userBody.Password != userBody.PasswordConfirm {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "비밀번호가 일치하지 않습니다.",
		})
		return
	}

	user := entitys.User{
		Email:    userBody.Email,
		Password: userBody.Password,
		Name:     userBody.Name,
	}

	if err := orm.Client.Select("Email", "Password", "Name", "ConnectedAt").Create(&user).Error; err != nil {
		// 중복 키 에러 처리: https://github.com/go-gorm/gorm/issues/4037#issuecomment-771499867
		// 예시 에러 => Error 1062: Duplicate entry 'user01@test.com' for key 'email'
		var mysqlErr *mysql.MySQLError
		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
			parseKey := strings.Split(mysqlErr.Message, "key ")[1]
			duplicateKey := strings.Replace(parseKey, "'", "", -1)
			switch duplicateKey {
			case "email":
				c.JSON(http.StatusConflict, gin.H{
					"message": "이미 사용중인 이메일입니다.",
				})
				return
			}
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.Header("Location", fmt.Sprintf("/users/%d", user.Id))
	c.JSON(http.StatusCreated, user)
}

// @Summary 로그인
// @Description 로그인을 성공 시 JWT token이 발급됩니다.
// @Tags User
// @Accept json
// @Produce json
// @Param data body models.UserLogin true "로그인 정보"
// @Success 200 {object} models.JWTToken
// @Failure 400 {object} models.ErrResponse
// @Failure 401 {object} models.ErrResponse
// @Failure 404
// @Failure 422 {object} models.ErrResponse
// @Failure 500 {object} models.ErrResponse
// @Router /users/login [post]
func UserLogin(c *gin.Context) {
	userBody := models.UserLogin{}
	user := entitys.User{}

	if err := c.BindJSON(&userBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	// 존재하는 사용자 인지 확인
	if err := orm.Client.Where("email = ?", userBody.Email).Find(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}
	if userBody.Email != user.Email {
		c.Status(http.StatusNotFound)
		return
	}

	// 비밀번호 일치하는지 확인
	if util.Sha256(userBody.Password) != user.Password {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "비밀번호가 일치하지 않습니다.",
		})
		return
	}

	// 토큰 생성
	userIdUint64 := uint64(user.Id)
	ts, err := auth.CreateToken(userIdUint64)
	if err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"message": err.Error(),
		})
		return
	}
	if err := auth.CreateAuth(userIdUint64, ts); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"message": err.Error(),
		})
		return
	}

	tokens := models.JWTToken{
		AccessToken:  ts.AccessToken,
		RefreshToken: ts.RefreshToken,
	}
	c.JSON(http.StatusOK, tokens)
}

func UserKakaoLoginCallBack(c *gin.Context) {
	kakaoToken := models.KakaoToken{}

	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "인가 코드가 전달되지 않았습니다. url에 있는 error_description key의 value를 확인해 주세요.",
		})
		return
	}

	if err := kakao.GetToken(code, &kakaoToken); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	userInfo, err := kakao.GetUserInfo(kakaoToken.AccessToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	// TODO: 사용자 정보 모델 만들어서 DB에 저장하기
	log.Println("kakao 사용자 정보:" + userInfo)

	// TODO: 하드 코딩이므로 동적으로 변경될 것을 고려해야합니다.
	c.Redirect(http.StatusFound, "http://localhost:3000/auth-end")
}

func UserLogout(c *gin.Context) {
	au, err := auth.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "unauthorized")
		return
	}
	deleted, delErr := auth.DeleteAuth(au.AccessUuid)
	if delErr != nil || deleted == 0 {
		c.JSON(http.StatusUnauthorized, "unauthorized")
		return
	}
	c.JSON(http.StatusOK, "Successfully logged out")
}

func UserTokenRefresh(c *gin.Context) {
	mapToken := map[string]string{}
	if err := c.ShouldBindJSON(&mapToken); err != nil {
		c.JSON(http.StatusUnprocessableEntity, err.Error())
		return
	}
	refreshToken := mapToken["refresh_token"]

	//verify the token
	os.Setenv("REFRESH_SECRET", "mcmvmkmsdnfsdmfdsjf") //this should be in an env file
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		//Make sure that the token method conform to "SigningMethodHMAC"
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("REFRESH_SECRET")), nil
	})
	//if there is an error, the token must have expired
	if err != nil {
		c.JSON(http.StatusUnauthorized, "Refresh token expired")
		return
	}
	//is token valid?
	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		c.JSON(http.StatusUnauthorized, err)
		return
	}
	//Since token is valid, get the uuid:
	claims, ok := token.Claims.(jwt.MapClaims) //the token claims should conform to MapClaims
	if ok && token.Valid {
		refreshUuid, ok := claims["refresh_uuid"].(string) //convert the interface to string
		if !ok {
			c.JSON(http.StatusUnprocessableEntity, err)
			return
		}
		userId, err := strconv.ParseUint(fmt.Sprintf("%.f", claims["user_id"]), 10, 64)
		if err != nil {
			c.JSON(http.StatusUnprocessableEntity, "Error occurred")
			return
		}
		//Delete the previous Refresh Token
		deleted, delErr := auth.DeleteAuth(refreshUuid)
		if delErr != nil || deleted == 0 {
			c.JSON(http.StatusUnauthorized, "unauthorized")
			return
		}
		//Create new pairs of refresh and access tokens
		ts, createErr := auth.CreateToken(userId)
		if createErr != nil {
			c.JSON(http.StatusForbidden, createErr.Error())
			return
		}
		//save the tokens metadata to redis
		saveErr := auth.CreateAuth(userId, ts)
		if saveErr != nil {
			c.JSON(http.StatusForbidden, saveErr.Error())
			return
		}
		tokens := map[string]string{
			"access_token":  ts.AccessToken,
			"refresh_token": ts.RefreshToken,
		}
		c.JSON(http.StatusCreated, tokens)
	} else {
		c.JSON(http.StatusUnauthorized, "refresh expired")
	}
}
