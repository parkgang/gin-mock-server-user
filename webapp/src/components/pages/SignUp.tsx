import { Alert, Button, Input } from "@fluentui/react-northstar";
import axios from "axios";
import StandardLayout from "components/templates/StandardLayout";
import useKeyword from "hooks/useKeyword";
import { PostUser, UserLogin } from "libs/api/user";
import { getErrorsCause } from "libs/error";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ElementCenter from "styles/ElementCenter";

const FlexContainer = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function SignUp() {
  const [alertMessage, setAlertMessage] = useState<string>("");

  const [email, , handleEmail] = useKeyword();
  const [password, , handlePassword] = useKeyword();
  const [passwordConfirm, , handlePasswordConfirm] = useKeyword();
  const [name, , handleName] = useKeyword();

  const navigate = useNavigate();
  const handleError = useErrorHandler();

  async function handleSignUp() {
    try {
      await PostUser({ name, email, password, passwordConfirm });
      await UserLogin(email, password);
      setAlertMessage("");
      navigate(-1);
    } catch (error) {
      if (error instanceof Error) {
        const cause = getErrorsCause(error);
        if (axios.isAxiosError(cause)) {
          switch (cause.response?.status) {
            case 400:
            case 409:
              setAlertMessage(cause.response.data.message);
              return;
          }
        }
      }
      handleError(error);
    }
  }

  return (
    <>
      <StandardLayout>
        <ElementCenter>
          <FlexContainer>
            <Input
              fluid
              label="이메일"
              labelPosition="inside"
              onChange={handleEmail}
            />
            <Input
              fluid
              label="비밀번호"
              labelPosition="inside"
              type="password"
              onChange={handlePassword}
            />
            <Input
              fluid
              label="비밀번호 확인"
              labelPosition="inside"
              type="password"
              onChange={handlePasswordConfirm}
            />
            <Input
              fluid
              label="이름"
              labelPosition="inside"
              onChange={handleName}
            />
            <div style={{ width: "100%" }}>
              <Button fluid primary content="회원가입" onClick={handleSignUp} />
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
          </FlexContainer>
        </ElementCenter>
      </StandardLayout>
    </>
  );
}
