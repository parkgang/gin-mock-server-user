package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
)

func main() {
	const port string = ":8080"

	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	router.POST("/", controller.PostUser)
	router.GET("/", controller.GetUser)
	router.PUT("/:id", controller.PutUser)
	router.DELETE("/:id", controller.DeleteUser)

	router.Static("/", "../webapp")

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	router.Run(port)
}
