import { Alert, Button, Input } from "@fluentui/react-northstar";
import { HomePath } from "App";
import axios from "axios";
import StandardLayout from "components/templates/StandardLayout";
import useConfigQuery from "hooks/query/useConfigQuery";
import useKeyword from "hooks/useKeyword";
import { UserLogin } from "libs/api/user";
import { getErrorsCause } from "libs/error";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.section`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const FlexContainer = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function SignIn() {
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [email, , handleEmail] = useKeyword();
  const [password, , handlePassword] = useKeyword();
  const config = useConfigQuery();

  const navigate = useNavigate();
  const handleError = useErrorHandler();

  async function handleLogin() {
    try {
      await UserLogin(email, password);
      setAlertMessage("");
      navigate(HomePath, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        const cause = getErrorsCause(error);
        if (axios.isAxiosError(cause)) {
          switch (cause.response?.status) {
            case 400:
            case 401:
            case 422:
            case 500:
              setAlertMessage(cause.response.data.message);
              return;
            case 404:
              setAlertMessage("존재하지 않는 계정 입니다.");
              return;
          }
        }
      }
      handleError(error);
    }
  }

  function handleKakaoLogin() {
    const clientId = config.kakao.restApiKey;
    const redirectUri = config.kakao.redirectUri;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }

  return (
    <>
      <StandardLayout>
        <Layout>
          <FlexContainer>
            <Input
              fluid
              label="이메일"
              labelPosition="inside"
              onChange={handleEmail}
            />
            <Input
              fluid
              label="패스워드"
              labelPosition="inside"
              type="password"
              onChange={handlePassword}
            />
            <div style={{ width: "100%" }}>
              <Button fluid primary content="로그인" onClick={handleLogin} />
              {alertMessage && (
                <Alert
                  attached="bottom"
                  content={alertMessage}
                  variables={{
                    oof: true,
                  }}
                  style={{ width: "100%" }}
                />
              )}
            </div>
            <img
              src="./kakao_login_medium_narrow.png"
              width="100%"
              alt="카카오 로그인 버튼"
              onClick={handleKakaoLogin}
              style={{ cursor: "pointer" }}
            />
          </FlexContainer>
        </Layout>
      </StandardLayout>
    </>
  );
}
