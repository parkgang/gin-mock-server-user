import { Button } from "@fluentui/react-northstar";
import { SignInPath, SignUpPath } from "App";
import StandardLayout from "components/templates/StandardLayout";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ElementCenter from "styles/ElementCenter";

const FlexContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export default function Users() {
  const histroy = useHistory();

  function handleHistoryPush(path: string) {
    return () => histroy.push(path);
  }

  return (
    <>
      <StandardLayout>
        <ElementCenter>
          <FlexContainer>
            <img
              src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
              alt="사용자 프로필 사진"
              style={{
                borderRadius: "30px",
                width: "150px",
              }}
            />
            <span>테스트 사용자</span>
            <span>test01@test.com</span>
            <Button content="Sign in" onClick={handleHistoryPush(SignInPath)} />
            <Button
              primary
              content="Sign up"
              onClick={handleHistoryPush(SignUpPath)}
            />
          </FlexContainer>
        </ElementCenter>
      </StandardLayout>
    </>
  );
}
