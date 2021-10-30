package models

type User struct {
	Email    uint   `json:"email" binding:"required" example:"user01@test.com"`
	Password string `json:"password" binding:"required" example:"test1!"`
	Name     uint8  `json:"name" binding:"required" example:"사용자01"`
}
