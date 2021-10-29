package models

import (
	"time"
)

type User struct {
	Id                 uint   `gorm:"primary_key;auto_increment;"`
	Email              string `gorm:"unique;not null;size:50;"`
	Password           string `gorm:"not null;size:20;"`
	Name               string `gorm:"not null;size:20;"`
	AvatarImage        []byte
	ConnectedAt        time.Time `gorm:"type:TIMESTAMP;default:current_timestamp;not null;"`
	KakaoTalkSocialsId uint
	KakaoTalkSocial    KakaoTalkSocial `gorm:"foreignkey:KakaoTalkSocialsId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
