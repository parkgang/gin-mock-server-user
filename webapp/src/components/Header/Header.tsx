import { useRecoilState } from "recoil";
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
  ThemePrepared,
} from "@fluentui/react-northstar";

import { themeState } from "states/fluentui-northstar";
import { SetLocalStorageTheme } from "libs/local-storage";
import {
  FluentuiNorthstarThemeList,
  FluentuiNorthstarThemeToString,
} from "types/fluentui-northstar";

export default function Header() {
  const [theme, setTheme] = useRecoilState(themeState);

  const history = useHistory();

  const menuItems = [
    {
      key: "/",
      content: "Home",
      onClick() {
        history.push("/");
      },
      styles: {
        padding: "0.6rem",
      },
    },
    {
      key: "/about",
      content: "About",
      onClick() {
        history.push("/about");
      },
      styles: {
        padding: "0.6rem",
      },
    },
    {
      key: "/users",
      content: "Users",
      onClick() {
        history.push("/users");
      },
      styles: {
        padding: "0.6rem",
      },
    },
  ];
  const menuDefaultIndex = menuItems.findIndex(
    (x) => x.key === history.location.pathname
  );
  const dropdownItems = [
    {
      key: FluentuiNorthstarThemeList.teamsTheme,
      header: "Teams",
      onClick() {
        handleTheme(teamsTheme);
      },
    },
    {
      key: FluentuiNorthstarThemeList.teamsDarkTheme,
      header: "Teams Dark",
      onClick() {
        handleTheme(teamsDarkTheme);
      },
    },
    {
      key: FluentuiNorthstarThemeList.teamsHighContrastTheme,
      header: "Teams High Contrast",
      onClick() {
        handleTheme(teamsHighContrastTheme);
      },
    },
    {
      key: FluentuiNorthstarThemeList.teamsV2Theme,
      header: "Teams V2",
      onClick() {
        handleTheme(teamsV2Theme);
      },
    },
    {
      key: FluentuiNorthstarThemeList.teamsDarkV2Theme,
      header: "Teams Dark V2",
      onClick() {
        handleTheme(teamsDarkV2Theme);
      },
    },
  ];
  const dropdownDefaultValue = dropdownItems.find(
    (x) => x.key === FluentuiNorthstarThemeToString(theme)
  );

  function handleTheme(theme: ThemePrepared) {
    SetLocalStorageTheme(theme);
    setTheme(theme);
  }

  return (
    <>
      <Flex gap="gap.small" space="between" vAlign="center">
        <Menu
          defaultActiveIndex={menuDefaultIndex}
          items={menuItems}
          style={{
            height: "2.3rem",
          }}
        />
        <Dropdown
          checkable
          fluid
          defaultValue={dropdownDefaultValue}
          items={dropdownItems}
          style={{
            width: "12rem",
          }}
        />
      </Flex>
    </>
  );
}
