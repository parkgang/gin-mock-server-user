import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";
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

import { themeState } from "states/fluentui-northstar";

export default function Header() {
  const setTheme = useSetRecoilState(themeState);

  const history = useHistory();

  return (
    <>
      <Flex gap="gap.small" space="between" vAlign="center">
        <Menu
          defaultActiveIndex={0}
          style={{
            height: "2.3rem",
          }}
          items={[
            {
              key: "Home",
              content: "Home",
              onClick() {
                history.push("/");
              },
              styles: {
                padding: "0.6rem",
              },
            },
            {
              key: "About",
              content: "About",
              onClick() {
                history.push("/about");
              },
              styles: {
                padding: "0.6rem",
              },
            },
            {
              key: "Users",
              content: "Users",
              onClick() {
                history.push("/users");
              },
              styles: {
                padding: "0.6rem",
              },
            },
          ]}
        />
        <Dropdown
          checkable
          fluid
          defaultValue={["Teams"]}
          items={[
            {
              key: "Teams",
              header: "Teams",
              onClick() {
                setTheme(teamsTheme);
              },
            },
            {
              key: "Teams Dark",
              header: "Teams Dark",
              onClick() {
                setTheme(teamsDarkTheme);
              },
            },
            {
              key: "Teams High Contrast",
              header: "Teams High Contrast",
              onClick() {
                setTheme(teamsHighContrastTheme);
              },
            },
            {
              key: "Teams V2",
              header: "Teams V2",
              onClick() {
                setTheme(teamsV2Theme);
              },
            },
            {
              key: "Teams Dark V2",
              header: "Teams Dark V2",
              onClick() {
                setTheme(teamsDarkV2Theme);
              },
            },
          ]}
          style={{
            width: "12rem",
          }}
        />
      </Flex>
    </>
  );
}
