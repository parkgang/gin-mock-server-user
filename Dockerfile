FROM node:14.16.1 AS cra-builder
WORKDIR /var/webapp
COPY webapp .
RUN npm i
RUN npm run build
WORKDIR /dist
RUN cp -r /var/webapp/build .

# [해당 문서를 참고하였습니다](https://thesorauniverse.com/posts/kr/golang/making-golang-docker-img-best-practices/)
FROM golang:1.16.3 AS go-builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY server .

RUN go mod download

RUN go build -o main .

WORKDIR /dist

RUN cp /build/main .
RUN cp /build/configs/config.prod.json .

FROM scratch

COPY --from=cra-builder /dist/build ./webapp/build
COPY --from=go-builder /dist/main .
COPY --from=go-builder /dist/config.prod.json ./configs/config.prod.json

ENV GO_ENV=production

ENTRYPOINT ["/main"]