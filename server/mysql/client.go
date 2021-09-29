package mysql

import (
	"fmt"
	"log"

	"github.com/parkgang/modern-board/models"
	"github.com/spf13/viper"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	Client *gorm.DB
)

func init() {
	mysqlMasterHost := viper.GetString("MYSQL_MASTER_HOST")
	mysqlMasterPort := viper.GetString("MYSQL_MASTER_PORT")
	mysqlMasterUser := viper.GetString("MYSQL_MASTER_USERNAME")
	mysqlMasterPass := viper.GetString("MYSQL_MASTER_PASSWORD")
	mysqlMasterDbname := viper.GetString("MYSQL_MASTER_DATABASE")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", mysqlMasterUser, mysqlMasterPass, mysqlMasterHost, mysqlMasterPort, mysqlMasterDbname)

	log.Println("mysql 연결 중...")
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Panic("DB 연결에 실패하였습니다.\n\t" + err.Error())
	}

	log.Println("mysql 마이그레이션 중...")
	if err := db.AutoMigrate(&models.User{}); err != nil {
		log.Panic("DB 마이그레이션에 실패하였습니다.\n\t" + err.Error())
	}

	log.Printf("mysql starting at %s\n", dsn)
	Client = db
}
