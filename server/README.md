# Core Stack

1. go1.16.3 darwin/amd64
1. gin
1. gorm
1. viper
1. swag

# swag 확인 및 업데이트 방법

1. [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html) 에서 swagger 문서를 확인하실 수 있습니다.

> vscode `tasks.json` 에 정의되어 있음으로 편하게 task으로 실행하세요! 😎

```shell
export PATH=$(go env GOPATH)/bin:$PATH
swag i
```

# 환경 변수

| Variable | dev | qa/prod | Default | Example                 | Usage                                                                 |
| -------- | :-: | :-----: | :-----: | ----------------------- | --------------------------------------------------------------------- |
| GO_ENV   | ✅  |   ✅    |   🤷‍♂️    | development, production | `Go 실행 환경` 을 설정하는 값이며 프로그램 시작전 값이 있어야 합니다. |

# 이외

## template

> mod

```shell
go mod init github.com/parkgang/modern-board
```
