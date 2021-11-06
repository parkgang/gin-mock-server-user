import { CommunicationOptions } from "@fluentui/react-teams";
import { HomePath } from "App";
import ReactTeamsCommunication from "components/organisms/ReactTeamsCommunication";
import StandardLayout from "components/templates/StandardLayout";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  function handleInteraction(target: string) {
    switch (target) {
      case "go-home":
        navigate(HomePath);
        break;
    }
  }

  return (
    <>
      <StandardLayout>
        <ReactTeamsCommunication
          option={CommunicationOptions.Thanks}
          fields={{
            title: `오, 존재하지 않는 페이지를 찾았어요!`,
            desc: `${window.location.pathname} 경로는 존재하지 않습니다.`,
            actions: {
              primary: {
                label: "홈 화면으로 돌아가기",
                target: "go-home",
              },
            },
          }}
          onInteraction={({ target }) => handleInteraction(target)}
        />
      </StandardLayout>
    </>
  );
}
