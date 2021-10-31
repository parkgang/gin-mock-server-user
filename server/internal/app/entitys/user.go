package entitys

import (
	"crypto/sha256"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type User struct {
	Id                 uint   `gorm:"primary_key;auto_increment;"`
	Email              string `gorm:"unique;not null;size:50;"`
	Password           string `gorm:"not null;size:64;"`
	Name               string `gorm:"not null;size:20;"`
	AvatarImage        []byte
	ConnectedAt        time.Time `gorm:"type:TIMESTAMP;default:current_timestamp;not null;"`
	KakaoTalkSocialsId uint
	KakaoTalkSocial    KakaoTalkSocial `gorm:"foreignkey:KakaoTalkSocialsId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (u *User) BeforeSave(tx *gorm.DB) (err error) {
	// 비밀번호 암호화: sha2('{비밀번호}', 256)
	h := sha256.Sum256([]byte(u.Password))
	u.Password = fmt.Sprintf("%x", h[:])

	// 로그인한 시간 UTC으로 저장: utc_timestamp()
	// 중요한 것은 GORM이 connection하는 loc에 의존됩니다: https://stackoverflow.com/a/60974094
	u.ConnectedAt = time.Now().UTC()
	return nil
}
