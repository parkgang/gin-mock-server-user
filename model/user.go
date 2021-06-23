package model

type User struct {
	Id   uint   `json:"id"`
	Name string `json:"name" binding:"required"`
	Arg  uint8  `json:"arg" binding:"required"`
}
