package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/db"
	"github.com/parkgang/modern-board/model"
	"github.com/parkgang/modern-board/mysql"
)

// @Summary 사용자 정보 생성
// @Description 사용자를 생성합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param data body model.User true "사용자 메타데이터"
// @Success 200
// @Failure 500 {string} err.Error()
// @Router / [post]
func PostUser(c *gin.Context) {
	var req model.User

	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	req.Id = db.UserAutoIncrement
	db.UserAutoIncrement++

	db.UserInstance = append(db.UserInstance, req)
	fmt.Printf("%+v\n", req)
}

// @Summary 전체 사용자 정보 조회
// @Description 전체 사용자 정보를 반환합니다.
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {object} []model.User
// @Failure 500 {object} model.ErrResponse
// @Router / [get]
func GetUser(c *gin.Context) {
	users := []model.User{}

	err := mysql.Client.Find(&users)
	if err.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, users)
}

func PutUser(c *gin.Context) {
	var req model.User

	paramUserId := c.Param("id")
	userId, err := strconv.ParseUint(paramUserId, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	err = c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	for i, v := range db.UserInstance {
		if v.Id == uint(userId) {
			db.UserInstance[i].Name = req.Name
			db.UserInstance[i].Arg = req.Arg
			return
		}
	}

	c.JSON(http.StatusBadRequest, gin.H{"message": "존재하지 않는 사용자 입니다."})
}

func DeleteUser(c *gin.Context) {
	paramUserId := c.Param("id")
	userId, err := strconv.ParseUint(paramUserId, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	for i, v := range db.UserInstance {
		if v.Id == uint(userId) {
			db.UserInstance = append(db.UserInstance[:i], db.UserInstance[i+1:]...)
			return
		}
	}

	c.JSON(http.StatusBadRequest, gin.H{"message": "존재하지 않는 사용자 입니다."})
}
