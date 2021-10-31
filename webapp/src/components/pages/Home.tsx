import { Button, EmojiSurprisedIcon } from "@fluentui/react-northstar";
import ConfirmDialog from "components/organisms/ConfirmDialog";
import StandardLayout from "components/templates/StandardLayout";
import { useState } from "react";
import styled from "styled-components";

const ImageUpload = styled.div`
  label {
    cursor: pointer;
    font-size: 1em;
  }

  #chooseFile {
    display: none;
  }
`;

export default function Home() {
  const [profileImage, setProfileImage] = useState<File>();

  function loadFile(event: any) {
    const target = event.target as HTMLInputElement;
    const file = target.files![0];
    setProfileImage(file);
  }

  return (
    <>
      <StandardLayout>
        <h1>Home</h1>
        <ConfirmDialog
          trigger={
            <Button
              style={{
                minWidth: "0",
                padding: "0",
                width: "2.5rem",
              }}
              content={<EmojiSurprisedIcon />}
            />
          }
          message="컴펌 메시지 테스트"
          cancelContent="취소"
          confirmContent="확인"
          onCancel={() => {
            console.log(`취소 함수 테스트`);
          }}
          onConfirm={() => {
            console.log(`확인 함수 테스트`);
          }}
        />
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
      </StandardLayout>
    </>
  );
}
