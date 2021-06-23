package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/gin-mock-server-user/db"
	"github.com/parkgang/gin-mock-server-user/model"
)

func GetUser(c *gin.Context) {
	c.JSON(http.StatusOK, db.UserInstance)
}

func PostUser(c *gin.Context) {
	var req model.User
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "잘못된 요청 입니다."})
		return
	}
	db.UserInstance = append(db.UserInstance, req)
	fmt.Printf("%+v\n", req)
}
