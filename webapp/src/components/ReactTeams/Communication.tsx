import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as reactTeams from "@fluentui/react-teams";

import { FluentuiTeamsThemeState } from "states/fluentui-teams";

/**
 * Communication 컴포넌트가 height: "100vh"로 고정되어 있어 불필요한 공간을 차지하는 현상 제거용
 */
const ResetStyle = styled.div`
  & > div {
    height: initial;
  }
`;

/**
 * Theme Provider를 App.tsx와 같이 전역으로 Wrapper 하면 style 충돌 문제가 발생하여 테마가 필요한 부분의 컴포넌트에서만 적용해서 사용하도록 합니다.
 */
export default function Communication(props: reactTeams.TCommunicationProps) {
  const fluentuiReactTeamsTheme = useRecoilValue(FluentuiTeamsThemeState);

  return (
    <reactTeams.Provider themeName={fluentuiReactTeamsTheme} lang="en-US">
      <ResetStyle>
        <reactTeams.Communication {...props} />
      </ResetStyle>
    </reactTeams.Provider>
  );
}
