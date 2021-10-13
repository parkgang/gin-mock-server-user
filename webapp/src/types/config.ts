export type Config = {
  kakao: Kakao;
};

type Kakao = {
  restApiKey: string;
  redirectUri: string;
};
