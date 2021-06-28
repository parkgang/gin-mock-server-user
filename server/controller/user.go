package controller

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/db"
	"github.com/parkgang/modern-board/model"
)

// @Summary 사용자 정보 생성
// @Description 사용자를 생성합니다.
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

// @Summary 사용자 정보 조회
// @Description 사용자 정보를 반환합니다.
// @Accept json
// @Produce json
// @Success 200 {object} model.User
// @Failure 500 {string} err.Error()
// @Router / [get]
func GetUser(c *gin.Context) {
	// db.UserInstance == nil 으로 처리하면 C -> D 시 메모리가 1회 할당되어 더이상 해당 값이 nil으로 출력되지 않습니다.
	if len(db.UserInstance) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "사용자 데이터가 없습니다."})
		return
	}
	c.JSON(http.StatusOK, db.UserInstance)
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
