package router

import (
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controllers"
)

func Use(api *gin.RouterGroup) {
	api.GET("/ping", controllers.Ping)
	users := api.Group("/users")
	{
		users.POST("", controllers.PostUser)
		users.GET("", controllers.GetAllUser)
		users.GET("/:id", controllers.GetUser)
		users.PUT("/:id", controllers.PutUser)
		users.DELETE("", controllers.DeleteAllUser)
		users.DELETE("/:id", controllers.DeleteUser)
	}
}
