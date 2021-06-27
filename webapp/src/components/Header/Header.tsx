import { Checkbox, teamsDarkTheme, teamsTheme, Flex } from "@fluentui/react-northstar";
import { useSetRecoilState } from "recoil";

import { themeState } from "../../states/fluentui-northstar";

export default function Header() {
  const setTheme = useSetRecoilState(themeState);

  return (
    <>
      <Flex column>
        <Checkbox
          label="Subscribe to weekly newsletter"
          toggle
          onChange={(_, v) => {
            if (v?.checked) {
              setTheme(teamsDarkTheme);
              return;
            }
            setTheme(teamsTheme);
          }}
        />
      </Flex>
    </>
  );
}
