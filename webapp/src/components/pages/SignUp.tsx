import { Button, Input } from "@fluentui/react-northstar";
import StandardLayout from "components/templates/StandardLayout";
import useKeyword from "hooks/useKeyword";
import styled from "styled-components";
import ElementCenter from "styles/ElementCenter";

const FlexContainer = styled.section`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function SignUp() {
  const [name, , handleName] = useKeyword();
  const [emaill, , handleEmaill] = useKeyword();
  const [pw, , handlePw] = useKeyword();

  console.log({ name, emaill, pw });

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
              onChange={handleEmaill}
            />
            <Input
              fluid
              label="패스워드"
              labelPosition="inside"
              type="password"
              onChange={handlePw}
            />
            <Button fluid primary content="회원가입" />
          </FlexContainer>
        </ElementCenter>
      </StandardLayout>
    </>
  );
}
