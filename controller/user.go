package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/gin-mock-server-user/db"
	"github.com/parkgang/gin-mock-server-user/model"
)

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

func GetUser(c *gin.Context) {
	if db.UserInstance == nil {
		c.JSON(http.StatusOK, gin.H{"message": "저장된 데이터가 없습니다."})
		return
	}
	c.JSON(http.StatusOK, db.UserInstance)
}
