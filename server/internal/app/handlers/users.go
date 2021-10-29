package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/app/models"
	"github.com/parkgang/modern-board/internal/pkg/kakao"
)

func UserLogin(c *gin.Context) {
	// TODO: 사용자 로그인 핸들러 구현
	c.JSON(http.StatusOK, gin.H{
		"message": "사용자 로그인 핸들러 구현 예정",
	})
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
	// TODO: 사용자 로그아웃 핸들러 구현
	c.JSON(http.StatusOK, gin.H{
		"message": "사용자 로그아웃 핸들러 구현 예정",
	})
}

func UserTokenRefresh(c *gin.Context) {
	// TODO: 사용자 토큰 리프레시 핸들러 구현
	c.JSON(http.StatusOK, gin.H{
		"message": "사용자 토큰 리프레시 핸들러 구현 예정",
	})
}
