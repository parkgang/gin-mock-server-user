package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/internal/app/models"
	"github.com/spf13/viper"
)

func GetConfigs(c *gin.Context) {
	restApiKey := viper.GetString("kakao.restApiKey")
	redirectUri := viper.GetString("kakao.redirectUri")

	c.JSON(http.StatusOK, models.Config{
		Kakao: models.Kakao{
			RestApiKey:  restApiKey,
			RedirectUri: redirectUri,
		},
	})
}
