package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/controller"
)

func main() {
	const port string = ":8080"

	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.POST("/", controller.PostUser)
	r.GET("/", controller.GetUser)
	r.PUT("/:id", controller.PutUser)
	r.DELETE("/:id", controller.DeleteUser)

	fmt.Printf("gin server listening at http://localhost%s\n", port)
	r.Run(port)
}
