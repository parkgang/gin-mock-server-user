package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/parkgang/modern-board/common"
	"github.com/parkgang/modern-board/model"
	"github.com/parkgang/modern-board/mysql"
)

// @Summary 사용자 생성
// @Description 사용자를 생성합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param data body model.User true "사용자 메타데이터"
// @Success 200
// @Failure 500 {object} model.ErrResponse
// @Router /users [post]
func PostUser(c *gin.Context) {
	user := model.User{}

	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	result := mysql.Client.Create(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}
}

// @Summary 전체 사용자 조회
// @Description 전체 사용자를 반환합니다.
// @Tags User
// @Accept json
// @Produce json
// @Success 200 {object} []model.User
// @Failure 500 {object} model.ErrResponse
// @Router /users [get]
func GetAllUser(c *gin.Context) {
	users := []model.User{}

	result := mysql.Client.Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, users)
}

// @Summary 사용자 조회
// @Description 사용자 정보를 반환합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param id path int true "사용자 id"
// @Success 200 {object} model.User
// @Failure 500 {object} model.ErrResponse
// @Router /users/{id} [get]
func GetUser(c *gin.Context) {
	paramUserId := c.Param("id")

	userId, err := common.ConvertStringToUint(paramUserId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	users := model.User{
		Id: userId,
	}

	result := mysql.Client.First(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, users)
}

// @Summary 사용자 수정
// @Description 사용자 정보를 수정합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param id path int true "사용자 id"
// @Param data body model.User true "사용자 메타데이터"
// @Success 200
// @Failure 500 {object} model.ErrResponse
// @Router /users/{id} [put]
func PutUser(c *gin.Context) {
	user := model.User{}

	paramUserId := c.Param("id")

	userId, err := common.ConvertStringToUint(paramUserId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	result := mysql.Client.First(&model.User{}, userId)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	user.Id = userId
	result = mysql.Client.Save(&user)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}
}

// @Summary 전체 사용자 삭제
// @Description 전체 사용자 정보를 삭제합니다. 모든데이터가 날라가므로 주의해서 사용해주세요😨
// @Tags User
// @Accept json
// @Produce json
// @Success 200
// @Failure 500 {object} model.ErrResponse
// @Router /users [delete]
func DeleteAllUser(c *gin.Context) {
	result := mysql.Client.Where("1 = 1").Delete(&model.User{})
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}
}

// @Summary 사용자 삭제
// @Description 사용자를 삭제합니다.
// @Tags User
// @Accept json
// @Produce json
// @Param id path int true "사용자 id"
// @Success 200
// @Failure 500 {object} model.ErrResponse
// @Router /users/{id} [delete]
func DeleteUser(c *gin.Context) {
	paramUserId := c.Param("id")

	userId, err := common.ConvertStringToUint(paramUserId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	result := mysql.Client.First(&model.User{}, userId)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	result = mysql.Client.Delete(&model.User{}, userId)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
		})
		return
	}
}
