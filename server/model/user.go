package model

type User struct {
	Id   uint   `json:"id" swaggerignore:"true"`
	Name string `json:"name" binding:"required" example:"kyungeun"`
	Arg  uint8  `json:"arg" binding:"required" example:"99"`
}
