package httpclient

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/pkg/errors"
)

type xWwwFormUrlencodedHelperOptions struct {
	Data   url.Values
	Header map[string]string
}

func NewXWwwFormUrlencodedHelperOptions() *xWwwFormUrlencodedHelperOptions {
	// 옵셔널 값 기본 값 설정
	return &xWwwFormUrlencodedHelperOptions{
		Data: url.Values{},
	}
}

// [http Content-Type application/x-www-form-urlencoded 를 쉽게 요청할 수 있는 헬퍼 함수입니다.](https://golang.cafe/blog/how-to-make-http-url-form-encoded-request-golang.html)
func (o *xWwwFormUrlencodedHelperOptions) Run(method Method, endpoint string) (body []byte, err error) {
	// URL-encoded payload
	r, err := http.NewRequest(method.String(), endpoint, strings.NewReader(o.Data.Encode()))
	if err != nil {
		return nil, errors.Wrap(err, "http request 생성 실패")
	}

	r.Header.Add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8")
	r.Header.Add("Content-Length", strconv.Itoa(len(o.Data.Encode())))
	for i, v := range o.Header {
		r.Header.Add(i, v)
	}

	client := &http.Client{}
	res, err := client.Do(r)
	if err != nil {
		return nil, errors.Wrap(err, "http request 실패")
	}
	defer res.Body.Close()

	body, err = ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, errors.Wrap(err, "http response body read 실패")
	}

	return body, nil
}
