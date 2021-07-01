package config

import (
	"os"

	"github.com/spf13/viper"
)

const (
	development = "development"
	production  = "production"
)

func init() {
	viper.AutomaticEnv()
	viper.AddConfigPath("./config")

	switch os.Getenv("GO_ENV") {
	case "":
		panic("GO_ENV 값이 지정되지 않았습니다.")
	case development:
		viper.SetConfigName("config.dev")
	case production:
		viper.SetConfigName("config.prod")
	default:
		panic("알려지지 않은 GO_ENV 값 입니다.")
	}

	err := viper.ReadInConfig()
	if err != nil {
		panic("config 값 읽기에 실패하였습니다.\n\t" + err.Error())
	}
}
