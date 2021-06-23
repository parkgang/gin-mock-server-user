package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/gin-mock-server-user/controller"
)

func main() {
	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/", controller.GetUser)
	r.POST("/", controller.PostUser)

	fmt.Println("gin server listen")
	r.Run()
}
