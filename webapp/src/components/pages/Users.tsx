import { Button } from "@fluentui/react-northstar";
import { SignInPath, SignUpPath } from "App";
import StandardLayout from "components/templates/StandardLayout";
import { GetUserInfo } from "libs/api/user";
import { getLocalStorageAccessToken } from "libs/local-storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [avatar, setAvatar] = useState<string>(
    "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
  );

  const navigate = useNavigate();

  function handleHistoryPush(path: string) {
    return () => navigate(path);
  }

  function handleOnLogout() {
    console.log(`로그아웃`);
  }

  const accessToken = getLocalStorageAccessToken();

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const res = await GetUserInfo();
        setName(res.name);
        setEmail(res.email);
        setAvatar((prev) => res.avatarImage ?? prev);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (accessToken === null) {
    return (
      <>
        <StandardLayout>
          <ElementCenter>
            <FlexContainer>
              <h1>로그인 되지 않음</h1>
              <Button
                content="Sign in"
                onClick={handleHistoryPush(SignInPath)}
              />
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

  return (
    <>
      <StandardLayout>
        <ElementCenter>
          <FlexContainer>
            <img
              src={avatar}
              alt="사용자 프로필 사진"
              style={{
                borderRadius: "30px",
                width: "150px",
              }}
            />
            <span>{name}</span>
            <span>{email}</span>
            <Button primary content="Sign out" onClick={handleOnLogout} />
          </FlexContainer>
        </ElementCenter>
      </StandardLayout>
    </>
  );
}
