import {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  Flex,
  Dropdown,
  Menu,
} from "@fluentui/react-northstar";
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import { themeState } from "states/fluentui-northstar";

export default function Header() {
  const setTheme = useSetRecoilState(themeState);

  const history = useHistory();

  return (
    <>
      <Flex gap="gap.small" space="between" style={{ padding: "0.3rem" }}>
        <Menu
          defaultActiveIndex={0}
          underlined
          primary
          items={[
            {
              key: "Home",
              content: "Home",
              onClick: () => history.push("/"),
            },
            {
              key: "About",
              content: "About",
              onClick: () => history.push("/about"),
            },
            {
              key: "Users",
              content: "Users",
              onClick: () => history.push("/users"),
            },
          ]}
        />
        <Dropdown
          checkable
          defaultValue={["Teams"]}
          items={[
            {
              key: "Teams",
              header: "Teams",
              onClick: () => {
                setTheme(teamsTheme);
              },
            },
            {
              key: "Teams Dark",
              header: "Teams Dark",
              onClick: () => {
                setTheme(teamsDarkTheme);
              },
            },
            {
              key: "Teams High Contrast",
              header: "Teams High Contrast",
              onClick: () => {
                setTheme(teamsHighContrastTheme);
              },
            },
            {
              key: "Teams V2",
              header: "Teams V2",
              onClick: () => {
                setTheme(teamsV2Theme);
              },
            },
            {
              key: "Teams Dark V2",
              header: "Teams Dark V2",
              onClick: () => {
                setTheme(teamsDarkV2Theme);
              },
            },
          ]}
        />
      </Flex>
    </>
  );
}
