package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/pkg/auth"
)

func TokenAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		err := auth.TokenValid(c.Request)
		if err != nil {
			c.JSON(http.StatusUnauthorized, err.Error())
			c.Abort()
			return
		}
		c.Next()
	}
}
