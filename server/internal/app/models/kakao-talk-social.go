package models

type KakaoTalkSocial struct {
	Id             uint   `gorm:"primary_key;"`
	Email          string `gorm:"unique;not null;size:50;"`
	NickName       string `gorm:"not null;size:20;"`
	ThumbnailImage []byte
}
