import { Button, EmojiSurprisedIcon } from "@fluentui/react-northstar";
import ConfirmDialog from "components/organisms/ConfirmDialog";
import StandardLayout from "components/templates/StandardLayout";

export default function Home() {
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
      </StandardLayout>
    </>
  );
}
