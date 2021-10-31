import { Button, Input } from "@fluentui/react-northstar";
import StandardLayout from "components/templates/StandardLayout";
import useKeyword from "hooks/useKeyword";
import { useState } from "react";
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

const ImageUpload = styled.div`
  label {
    cursor: pointer;
    font-size: 1em;
  }

  #chooseFile {
    display: none;
  }
`;

export default function SignUp() {
  const [name, , handleName] = useKeyword();
  const [emaill, , handleEmaill] = useKeyword();
  const [pw, , handlePw] = useKeyword();
  const [profileImage, setProfileImage] = useState<File>();

  console.log({ name, emaill, pw });

  function loadFile(event: any) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    setProfileImage(file);
  }

  return (
    <>
      <StandardLayout>
        <Layout>
          <FlexContainer>
            <ImageUpload>
              <label htmlFor="chooseFile">
                <img
                  src={
                    profileImage
                      ? URL.createObjectURL(profileImage)
                      : "https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
                  }
                  alt="사용자 프로필 사진 선택"
                  style={{
                    borderRadius: "30px",
                    cursor: "pointer",
                    width: "150px",
                  }}
                />
              </label>
              <input
                type="file"
                id="chooseFile"
                name="chooseFile"
                accept="image/*"
                onChange={loadFile}
              />
            </ImageUpload>
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
        </Layout>
      </StandardLayout>
    </>
  );
}
