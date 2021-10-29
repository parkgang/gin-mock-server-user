import { Button, Input } from "@fluentui/react-northstar";
import useConfigQuery from "hooks/query/useConfigQuery";
import useKeyword from "hooks/useKeyword";
import styled from "styled-components";

const Layout = styled.section`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.section`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function SignIn() {
  const config = useConfigQuery();
  const [emaill, , handleEmaill] = useKeyword();
  const [pw, , handlePw] = useKeyword();

  function handleKakaoLogin() {
    const clientId = config.kakao.restApiKey;
    const redirectUri = config.kakao.redirectUri;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }

  console.log({ emaill, pw });

  return (
    <>
      <Layout>
        <FlexContainer>
          <Input
            fluid
            label="이메일"
            labelPosition="inside"
            onChange={handleEmaill}
          />
          <Input
            fluid
            label="패스워드"
            labelPosition="inside"
            type="password"
            onChange={handlePw}
          />
          <Button fluid primary content="로그인" />
          <img
            src="./kakao_login_medium_narrow.png"
            width="100%"
            alt="카카오 로그인 버튼"
            onClick={handleKakaoLogin}
            style={{ cursor: "pointer" }}
          />
        </FlexContainer>
      </Layout>
    </>
  );
}
