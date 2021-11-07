package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/app/handlers"
	"github.com/parkgang/modern-board/internal/app/middlewares"
)

func Use(api *gin.RouterGroup) {
	api.GET("/ping", handlers.Ping)
	// TODO: jwt 테스트 용도
	api.POST("/todo", middlewares.TokenAuthMiddleware(), handlers.CreateTodo)
	users := api.Group("/users")
	{
		users.POST("/signup", handlers.UserSignup)
		users.POST("/login", handlers.UserLogin)
		users.GET("/login/kakao", handlers.UserKakaoLoginCallBack)
		users.GET("", middlewares.TokenAuthMiddleware(), handlers.UserInfo)
		users.POST("/logout", middlewares.TokenAuthMiddleware(), handlers.UserLogout)
		users.POST("/token/refresh", handlers.UserTokenRefresh)
	}
	configs := api.Group("/configs")
	{
		configs.GET("", handlers.GetConfigs)
	}
}
