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

	router.Use(cors.Default())

	// SPA
	{
		const spaPath string = "../webapp/build"
		// 정적파일 서빙
		router.Use(static.Serve("/", static.LocalFile(spaPath, true)))
		// [CSR Router를 위함](https://github.com/gin-gonic/contrib/issues/90#issuecomment-286924994)
		router.NoRoute(func(c *gin.Context) {
			// CRA에서 "homepage": "./" 와 같이 경로를 지정하면 index.html 파일 경로까지 지정해야합니다.
			c.File(spaPath)
		})
	}

	api := router.Group("/api")
	{
		api.GET("/ping", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"message": "pong",
			})
		})
		api.POST("/", controller.PostUser)
		api.GET("/", controller.GetUser)
		api.PUT("/:id", controller.PutUser)
		api.DELETE("/:id", controller.DeleteUser)
	}

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	router.Run(port)
}
