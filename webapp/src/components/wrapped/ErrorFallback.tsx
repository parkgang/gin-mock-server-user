import { CommunicationOptions } from "@fluentui/react-teams";
import axios from "axios";
import ReactTeamsCommunication from "components/organisms/ReactTeamsCommunication";
import { getErrorsCause } from "libs/error";
import { FallbackProps } from "react-error-boundary";

function handleInteraction(target: string) {
  switch (target) {
    case "refresh":
      // window.location.reload(); 으로 새로고침 시도 시 에러가 발생한 url 그래도 새로고침되어 계속 에러가 발생한 queryString으로 돌아오므로 queryString을 제거하여 새로고침 하도록 합니다.
      window.location.href = window.location.href.split("?")[0];
      break;
  }
}

export default function ErrorFallback({ error }: FallbackProps) {
  const errorsCause = getErrorsCause(error);

  // handleError(); 등 을 통해 error를 any 타입으로 던지는 경우 Error interface 를 충족하지 못하여 문제가 발생합니다.
  // 모든 에러를 처리하는 Component으로 디자인 되었으므로 방어적으로 처리합니다.
  if (typeof error === "string") {
    // 다른 에러 컴포넌트와 interface를 맞추기 위해 Error 객체로 boxing 합니다.
    error = new Error(error);
  } else if (axios.isAxiosError(errorsCause)) {
    error.message = errorsCause.response?.data
      ? JSON.stringify(errorsCause.response?.data)
      : errorsCause.message;
  }

  return (
    <>
      <div style={{ height: "100vh" }}>
        <ReactTeamsCommunication
          option={CommunicationOptions.Error}
          fields={{
            title: `앗, 이런! 문제가 발생했어요.`,
            desc: error.message,
            actions: {
              primary: {
                label: "새로고침",
                target: "refresh",
              },
            },
          }}
          onInteraction={({ target }) => handleInteraction(target)}
        />
      </div>
    </>
  );
}
