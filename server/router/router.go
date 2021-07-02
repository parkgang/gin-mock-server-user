package router

import (
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
)

func Use(api *gin.RouterGroup) {
	api.GET("/ping", controller.Ping)
	users := api.Group("/users")
	{
		users.POST("/", controller.PostUser)
		users.GET("/", controller.GetAllUser)
		users.GET("/:id", controller.GetUser)
		users.PUT("/:id", controller.PutUser)
		users.DELETE("/", controller.DeleteAllUser)
		users.DELETE("/:id", controller.DeleteUser)
	}
}
