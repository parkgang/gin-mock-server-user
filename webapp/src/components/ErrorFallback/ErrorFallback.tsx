import { useHistory } from "react-router-dom";
import axios from "axios";
import { Flex, Text, Segment, ErrorIcon } from "@fluentui/react-northstar";

type Props = {
  title?: string;
  error: Error;
};

/**
 * Client의 모든 에러를 관장하는 함수이자 컴포넌트 입니다.
 * 각 에러 instance에 맞는 적절한 컴포넌트를 바인딩 해줍니다.
 */
function ErrorFallback({ title = "페이지를 표시하는 도중 문제가 발생했습니다.", error }: Props) {
  const history = useHistory();

  // TODO: error instance에 맞게 컴포넌트 바인딩
  // handleError(); 등 을 통해 error를 any 타입으로 던지는 경우 Error interface 를 충족하지 못하여 문제가 발생합니다.
  // 모든 에러를 처리하는 Component으로 디자인 되었으므로 방어적으로 처리합니다.
  if (typeof error === "string") {
    // 다른 에러 컴포넌트와 interface를 맞추기 위해 Error 객체로 boxing 합니다.
    error = new Error(error);
  }
  if (axios.isAxiosError(error)) {
    if (error.response?.data.match(/\binteraction required\b/) !== null) {
      history.push(`/login`);
    }
  }

  return (
    <>
      <Flex fill column vAlign="center" gap="gap.medium" style={{ padding: "5rem" }}>
        <ErrorIcon size="largest" />
        <Text size="larger">앗, 이런!</Text>
        <Text error>{title}</Text>
        <Segment color="red">
          <Text temporary>{error.message}</Text>
        </Segment>
      </Flex>
    </>
  );
}

export default ErrorFallback;
