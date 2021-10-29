package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/pkg/auth"
)

// @Summary Server Health Check
// @Description gin server의 헬스를 체크합니다.
// @Produce json
// @Success 200 {object} models.Pong
// @Router /ping [get]
func Ping(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "pong",
	})
}

type Todo struct {
	UserID uint64 `json:"user_id"`
	Title  string `json:"title"`
}

func CreateTodo(c *gin.Context) {
	var td *Todo
	if err := c.ShouldBindJSON(&td); err != nil {
		c.JSON(http.StatusUnprocessableEntity, "invalid json")
		return
	}
	tokenAuth, err := auth.ExtractTokenMetadata(c.Request)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "unauthorized")
		return
	}
	userId, err := auth.FetchAuth(tokenAuth)
	if err != nil {
		c.JSON(http.StatusUnauthorized, "unauthorized")
		return
	}
	td.UserID = userId

	//you can proceed to save the Todo to a database
	//but we will just return it to the caller here:
	c.JSON(http.StatusCreated, td)
}
