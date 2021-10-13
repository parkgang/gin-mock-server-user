package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/app/handlers"
)

func Use(api *gin.RouterGroup) {
	api.GET("/ping", handlers.Ping)
	users := api.Group("/users")
	{
		users.POST("", handlers.PostUser)
		users.GET("", handlers.GetAllUser)
		users.GET("/:id", handlers.GetUser)
		users.PUT("/:id", handlers.PutUser)
		users.DELETE("", handlers.DeleteAllUser)
		users.DELETE("/:id", handlers.DeleteUser)

		users.POST("/login", handlers.UserLogin)
		users.GET("/login/kakao", handlers.UserKakaoLoginCallBack)
		users.POST("/logout", handlers.UserLogout)
		users.POST("/token/refresh", handlers.UserTokenRefresh)
	}
}
