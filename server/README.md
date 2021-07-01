# Core Stack

1. go1.16.3 darwin/amd64
1. gin
1. gorm
1. viper
1. swag

# mod

```shell
go mod init github.com/parkgang/modern-board
```

# swag

```shell
export PATH=$(go env GOPATH)/bin:$PATH
swag i
```

# 환경 변수

| Variable | dev | qa/prod | Default | Example                 | Usage                                                                 |
| -------- | :-: | :-----: | :-----: | ----------------------- | --------------------------------------------------------------------- |
| GO_ENV   | ✅  |   ✅    |   🤷‍♂️    | development, production | `Go 실행 환경` 을 설정하는 값이며 프로그램 시작전 값이 있어야 합니다. |
