package kakao

import (
	"encoding/json"
	"fmt"
	"log"
	"net/url"

	"github.com/parkgang/modern-board/internal/app/models"
	"github.com/parkgang/modern-board/internal/pkg/httpclient"
	"github.com/spf13/viper"
)

var (
	// TODO: 전역 변수 사용은 좋지 않습니다. 함수내에서 메모리로 복사할 수 있도록 디자인 합니다.
	kakaoToken = models.KakaoToken{}
)

// TODO: Gin의 handler이외 코드는 모두 libs으로 아동하도록 합니다.
// TODO: 공통된 x-www-form-urlencoded 처리 client의 경우 함수화 시키도록 합니다.
func GetUserInfo() {
	endpoint := "https://kapi.kakao.com/v2/user/me"
	xWwwFormUrlencodedHelper := httpclient.NewXWwwFormUrlencodedHelperOptions()
	xWwwFormUrlencodedHelper.Header = map[string]string{
		"Authorization": "Bearer " + kakaoToken.AccessToken,
	}
	resBody, err := xWwwFormUrlencodedHelper.Run(httpclient.POST, endpoint)
	if err != nil {
		fmt.Println(err)
	}
	// 응답 string으로 출력, TODO: 사용자 정보를 담고 있는 모델만들기
	log.Println(string(resBody))
}

// 카카오 로그인이 완료되어 발급받은 인가 코드로 액세스 토큰과 리프레시 토큰을 발급 받습니다.
func GetToken(code string) {
	restApiKey := viper.GetString("kakao.restApiKey")
	redirectUri := viper.GetString("kakao.redirectUri")

	endpoint := "https://kauth.kakao.com/oauth/token"
	data := url.Values{}
	data.Set("grant_type", "authorization_code")
	data.Set("client_id", restApiKey)
	data.Set("redirect_uri", redirectUri)
	data.Set("code", code)

	xWwwFormUrlencodedHelper := httpclient.NewXWwwFormUrlencodedHelperOptions()
	xWwwFormUrlencodedHelper.Data = data
	resBody, err := xWwwFormUrlencodedHelper.Run(httpclient.POST, endpoint)
	if err != nil {
		fmt.Println(err)
	}
	log.Println("카카오 로그인 > REST API > 토큰 받기 응답결과: " + string(resBody))

	// 응답 역직렬화
	if err := json.Unmarshal([]byte(resBody), &kakaoToken); err != nil {
		log.Fatal(err)
	}
}
