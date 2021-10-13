package models

type KakaoToken struct {
	// 토큰 타입, bearer로 고정
	TokenType string `json:"token_type" binding:"required"`
	// 사용자 액세스 토큰 값
	AccessToken string `json:"access_token" binding:"required"`
	// 액세스 토큰 만료 시간(초)
	ExpiresIn int `json:"expires_in" binding:"required"`
	// 사용자 리프레시 토큰 값
	RefreshToken string `json:"refresh_token" binding:"required"`
	// 리프레시 토큰 만료 시간(초)
	RefreshTokenExpiresIn int `json:"refresh_token_expires_in" binding:"required"`
	// 인증된 사용자의 정보 조회 권한 범위, 범위가 여러 개일 경우, 공백으로 구분
	Scope string `json:"scope"`
}
