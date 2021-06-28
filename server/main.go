package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
	_ "github.com/parkgang/modern-board/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Swagger Example API
// @version 1.0
// @description This is a sample server Petstore server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host petstore.swagger.io
// @BasePath /v2
func main() {
	const port string = ":8080"

	router := gin.Default()

	router.Use(cors.Default())

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

	// Swagger
	{
		url := ginSwagger.URL(fmt.Sprintf("http://localhost%s/swagger/doc.json", port))
		router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))
	}

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	router.Run(port)
}
