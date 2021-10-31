import { Button, Input } from "@fluentui/react-northstar";
import StandardLayout from "components/templates/StandardLayout";
import useKeyword from "hooks/useKeyword";
import { PostUser } from "libs/api/user";
import { useErrorHandler } from "react-error-boundary";
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
  const [name, , handleName] = useKeyword();
  const [email, , handleEmail] = useKeyword();
  const [password, , handlePassword] = useKeyword();
  const [passwordConfirm, , handlePasswordConfirm] = useKeyword();

  const handleError = useErrorHandler();

  async function handleSignUp() {
    try {
      await PostUser({ name, email, password, passwordConfirm });
    } catch (error) {
      handleError(error);
    }
  }

  console.log({ name, email, password, passwordConfirm });

  return (
    <>
      <StandardLayout>
        <ElementCenter>
          <FlexContainer>
            <Input
              fluid
              label="이름"
              labelPosition="inside"
              onChange={handleName}
            />
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
            <Button fluid primary content="회원가입" onClick={handleSignUp} />
          </FlexContainer>
        </ElementCenter>
      </StandardLayout>
    </>
  );
}
