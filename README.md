<p align="center">
  <table align="center">
    <tbody>
      <tr>
        <td>
          <img src="https://user-images.githubusercontent.com/63892989/132948190-0e2e9cb6-bafc-4e9f-9bce-c0248397f095.png" alt="screenshot" width="500" />
        </td>
        <td>
          <img src="https://user-images.githubusercontent.com/63892989/132948191-154b0c14-0648-4817-9ca6-32702d03c75f.png" alt="screenshot" width="500" />
        </td>
      </tr>
    </tbody>
  </table>
  <h1 align="center">
    ✨ modern-board 🤟
  </h1>
</p>
<div align="center">

`Bulletins created using modern stacks`

일반적인 기능을 가지고 있는 게시판 **웹 앱**이지만 나름대로 현대적인 기술을 사용하여 재해석한 프로젝트입니다. 룩앤필은 [Microsoft Teams](https://www.microsoft.com/ko-kr/microsoft-teams/group-chat-software) 를 따라갑니다. 프로젝트에 사용 된 기술은 각 제품의 [webapp (react)](./webapp), [server (gin)](./server) 를 참고해주세요.

</div>

## Common tool

1. vscode
1. datagrip
1. docker

## Quick start

`docker-compose up -d` 으로 docker 컨테이너를 올리고 vscode `실행 및 디버그` 에서 `Server/Client` 으로 실행하세요!

물론, 필요한 의존성과 docker, vscode extension은 미리 설치되어 있어야 합니다! 각 제품의 `README.md` 를 참고하세요.

컨테이너 실행과 같은 명령어는 vscode `tasks.json` 에도 정의되어 있음으로 편하게 task로 실행하세요! 😎

> 첫 컨테이너를 프로비저닝하는데 시간이 소요되므로 아래의 명령어로 1회 컨테이너 apply 이후 여유를 시간을 두고 디버깅을 실행시켜주세요.

## Prod deployment

prod으로 쉽게 배포할 수 있도록 `Dockerfile` 파일이 모두 작성되어 있으니 개발 프로세스에 맞춰서 `CI/CD` pipeline으로 태우거나 혹은 아래의 cli로 배포의 재미를 느껴보세요!

```shell
docker build -t parkgang/modern-board:0.1.0 .
docker run --name modern-board-prod -p 22000:8080 -d parkgang/modern-board:0.1.0
```
