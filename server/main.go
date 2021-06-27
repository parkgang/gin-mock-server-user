package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
)

func main() {
	const port string = ":8080"

	router := gin.Default()

	// SPA
	{
		// 정적파일 서빙
		router.Use(static.Serve("/", static.LocalFile("../webapp/build", true)))
		// [CSR Router를 위함](https://github.com/gin-gonic/contrib/issues/90#issuecomment-286924994)
		router.NoRoute(func(c *gin.Context) {
			// 반드시 index.html 파일 경로로 지정해야합니다.
			c.File("../webapp/build/index.html")
		})
	}

	router.Use(cors.Default())

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	api := router.Group("/api")
	{
		api.POST("/", controller.PostUser)
		api.GET("/", controller.GetUser)
		api.PUT("/:id", controller.PutUser)
		api.DELETE("/:id", controller.DeleteUser)
	}

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	router.Run(port)
}
