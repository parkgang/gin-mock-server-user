import { CommunicationOptions } from "@fluentui/react-teams";
import { HomePath } from "App";
import ReactTeamsCommunication from "components/wrapped/ReactTeamsCommunication";
import { RouteComponentProps, useHistory } from "react-router";

export default function NotFound({ location }: RouteComponentProps) {
  const history = useHistory();

  function handleInteraction(target: string) {
    switch (target) {
      case "go-home":
        history.push(HomePath);
        break;
    }
  }

  return (
    <>
      <ReactTeamsCommunication
        option={CommunicationOptions.Thanks}
        fields={{
          title: `오, 존재하지 않는 페이지를 찾았어요!`,
          desc: `${location.pathname} 경로는 존재하지 않습니다.`,
          actions: {
            primary: {
              label: "홈 화면으로 돌아가기",
              target: "go-home",
            },
          },
        }}
        onInteraction={({ target }) => handleInteraction(target)}
      />
    </>
  );
}
