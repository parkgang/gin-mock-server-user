package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
	"github.com/parkgang/modern-board/docs"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

const (
	version string = "0.1.0"
	port    string = ":8080"
)

func main() {
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
		docs.SwaggerInfo.Title = "modern-board example API"
		docs.SwaggerInfo.Description = "사용자 데이터를 관리할 수 있는 API를 제공합니다."
		docs.SwaggerInfo.Version = version
		docs.SwaggerInfo.Host = fmt.Sprintf("localhost%s", port)
		docs.SwaggerInfo.BasePath = "/api"
		docs.SwaggerInfo.Schemes = []string{"http"}

		url := ginSwagger.URL(fmt.Sprintf("http://localhost%s/swagger/doc.json", port))
		router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))
	}

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	router.Run(port)
}
