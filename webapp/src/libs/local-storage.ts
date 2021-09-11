import {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  ThemePrepared,
} from "@fluentui/react-northstar";

import { name } from "../../package.json";
import {
  FluentuiNorthstarThemeList,
  FluentuiNorthstarThemeToString,
} from "types/fluentui-northstar";

const themeKey = `${name}-theme`;

export function GetLocalStorageTheme() {
  switch (localStorage.getItem(themeKey)) {
    case FluentuiNorthstarThemeList.teamsTheme:
      return teamsTheme;
    case FluentuiNorthstarThemeList.teamsDarkTheme:
      return teamsDarkTheme;
    case FluentuiNorthstarThemeList.teamsHighContrastTheme:
      return teamsHighContrastTheme;
    case FluentuiNorthstarThemeList.teamsV2Theme:
      return teamsV2Theme;
    case FluentuiNorthstarThemeList.teamsDarkV2Theme:
      return teamsDarkV2Theme;
    default:
      return teamsTheme;
  }
}

export function SetLocalStorageTheme(theme: ThemePrepared) {
  localStorage.setItem(themeKey, FluentuiNorthstarThemeToString(theme));
}
