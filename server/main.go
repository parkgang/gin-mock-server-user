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
	router.Use(static.Serve("/", static.LocalFile("../webapp/build", true)))

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
