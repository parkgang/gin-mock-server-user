import { Button } from "@fluentui/react-northstar";
import { SignInPath, SignUpPath } from "App";
import axios from "axios";
import StandardLayout from "components/templates/StandardLayout";
import { GetUserInfo, UserLogout } from "libs/api/user";
import { getErrorsCause } from "libs/error";
import {
  delLocalStorageAccessToken,
  delLocalStorageRefreshToken,
  getLocalStorageAccessToken,
} from "libs/local-storage";
import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
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
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOIAAADfCAMAAADcKv+WAAAAMFBMVEWhtunL1vLM1/KftOm1xe3M1vKit+m/ze+kuOrH0/Gqveuyw+3D0PC6ye6uwOyftOY8UPyPAAADcklEQVR4nO3c3XKrIBSGYRGN4l/v/2632k6mSdPAslmB5X6fo0wPWr5ZCEKgVQUAAAAAAAAAAAAAAAAAAAAAAAAAkPO+6odhWYbhsn48H18t8+RcvXOhG/uTpfTDvKZr3dWacxqr86T0w7RW7t76oyZ3y17E992DgJ8p3XKGQvrF/RJwD9nlbt/f+flJwC1j6HM38Y989zzh1lkH053VT7GEW0jLGeM1/DTkbuhhvklL2IZL7qYeNaQl3MZVq101MeCWcTSZMTZd3Mrd2kN6ScJ6NlhGWRFda3DEuYgSuroxV8bUCeMq5G6xmJ/aeKybMpqb/3thQoMDziLsp66djEUUjqc7Y2Nq0hLjlrWH0QdxEesld6OFDkQcc7dZ5iJOaG7y788f8UgVjXXU/+BZ9EH6dmNuRE3dmPoe0diGqnih4ewt/JO3pq5FtPaOKh9Src0ZBx5Ga49iJV5N2eunaxmFRTQ2K26EY6q9rZuNrIj2+ulaxjG9jG2wmFC08re24r9KXlGpzokfH3q/u/KJE4fuhKEaMfFxrHVHU92ISTOHekLdiAl1rCfd/VP1iJGTRds+v3IDtDvqyl+ezB2105/y9SM+KWTdzpc3TPlviLhqwo+Tfm1dd5bPFN3z1dJtZ22/9qy2j6E526HbNeXQdPu5YhemeelPeXa68l+x/DnjAXjuPfNiTu94u8mMiCegv5j65B97x5/WjrhfdlvGsfnFuCyD9suOYkTvh7ELddz2yqp4Q0wr4vrS3bn65rLbk5X/fg9ObeGhEtH3888FYiymM7R8XAO28q/Bt5STlYtws7CA30MGA5WM7bhFQ87Fn9mUH0a5D1n2TTjfh78mdGUfbPBL2iQRzVjs1VTJd6aRjFPuLI8dOTD1a8Yir/u9roZ7xgLrmPp1aXrG4sYc8Zm3aMbirm3Kz59GM5Z1TuXA8dOEjCWdinvtUHONWNTjqBDQFdVVj1yQSlPM7Ci6NSxRzIU/lbHmK2MhZVQrYjFl1HsSN0WUUXh8WKaMw8Yvfjm9i1jC3Kg42OwZS3jF0QxYRk99+RLjLmL+Bccr1/qP5Y8ov/otU8CxcfldTGHE7NcaD1waFkbMvquqPNqUMN6oTvx7xOyTv3rE/P9eRGVL47s6+12j0QVtuSMCAAAAAAAAAAAAAAAAAAAAAAAAAACpf/P2JHtXd325AAAAAElFTkSuQmCC"
  );

  const navigate = useNavigate();
  const handleError = useErrorHandler();

  function handleHistoryPush(path: string) {
    return () => navigate(path);
  }

  async function handleOnLogout() {
    try {
      await UserLogout();
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  }

  const accessToken = getLocalStorageAccessToken();

  useEffect(() => {
    (async () => {
      if (accessToken) {
        try {
          const res = await GetUserInfo();
          setName(res.name);
          setEmail(res.email);
          if (res.avatarImage) {
            setAvatar(res.avatarImage);
          }
        } catch (error) {
          if (error instanceof Error) {
            const cause = getErrorsCause(error);
            if (axios.isAxiosError(cause)) {
              switch (cause.response?.status) {
                case 401:
                  delLocalStorageAccessToken();
                  delLocalStorageRefreshToken();
                  window.location.reload();
                  break;
              }
            }
          }
          handleError(error);
        }
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
