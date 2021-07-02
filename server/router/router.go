package router

import (
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
)

func Use(api *gin.RouterGroup) {
	// TODO: swaager 문서 등록
	api.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	api.POST("/", controller.PostUser)
	api.GET("/", controller.GetAllUser)
	api.GET("/:id", controller.GetUser)
	api.PUT("/:id", controller.PutUser)
	api.DELETE("/", controller.DeleteAllUser)
	api.DELETE("/:id", controller.DeleteUser)
}
