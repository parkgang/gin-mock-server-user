import {
  Dropdown,
  Flex,
  Menu,
  teamsDarkTheme,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsTheme,
  teamsV2Theme,
  ThemePrepared,
} from "@fluentui/react-northstar";
import { HomePath, UsersPath } from "App";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { FluentuiNorthstarThemeState } from "states/fluentui-northstar";
import {
  FluentuiNorthstarThemeList,
  getFluentuiNorthstarThemeToString,
} from "types/fluentui-northstar";

export default function Gnb() {
  const [fluentuiNorthstarTheme, setFluentuiNorthstarTheme] = useRecoilState(
    FluentuiNorthstarThemeState
  );

  const navigate = useNavigate();

  const menuItems = [
    {
      key: HomePath,
      content: "Home",
      onClick() {
        navigate(HomePath);
      },
      styles: {
        padding: "0.6rem",
      },
    },
    {
      key: UsersPath,
      content: "Users",
      onClick() {
        navigate(UsersPath);
      },
      styles: {
        padding: "0.6rem",
      },
    },
  ];
  const menuDefaultIndex = menuItems.findIndex(
    (x) => x.key === window.location.pathname
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
    (x) => x.key === getFluentuiNorthstarThemeToString(fluentuiNorthstarTheme)
  );

  function handleTheme(theme: ThemePrepared) {
    setFluentuiNorthstarTheme(theme);
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
