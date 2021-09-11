import { selector } from "recoil";
import { themeNames } from "@fluentui/react-teams";

import { FluentuiNorthstarThemeState } from "states/fluentui-northstar";
import {
  FluentuiNorthstarThemeList,
  FluentuiNorthstarThemeToString,
} from "types/fluentui-northstar";

export const FluentuiTeamsThemeState = selector({
  key: "FluentuiTeamsThemeState",
  get: ({ get }) => {
    const fluentuiNorthstarTheme = get(FluentuiNorthstarThemeState);

    switch (FluentuiNorthstarThemeToString(fluentuiNorthstarTheme)) {
      case FluentuiNorthstarThemeList.teamsTheme:
      case FluentuiNorthstarThemeList.teamsV2Theme:
        return themeNames.Default;
      case FluentuiNorthstarThemeList.teamsDarkTheme:
      case FluentuiNorthstarThemeList.teamsDarkV2Theme:
        return themeNames.Dark;
      case FluentuiNorthstarThemeList.teamsHighContrastTheme:
        return themeNames.HighContrast;
    }
  },
});
