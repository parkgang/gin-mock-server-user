import { themeNames } from "@fluentui/react-teams";
import { FluentuiNorthstarThemeList } from "types/fluentui-northstar";

/**
 * FluentuiNorthstarTheme를 FluentuiTeamsTheme으로 맵핑해줍니다.
 */
export function mapWithFluentuiTeamsTheme(theme: FluentuiNorthstarThemeList) {
  switch (theme) {
    case FluentuiNorthstarThemeList.teamsDarkTheme:
    case FluentuiNorthstarThemeList.teamsDarkV2Theme:
      return themeNames.Dark;
    case FluentuiNorthstarThemeList.teamsHighContrastTheme:
      return themeNames.HighContrast;
    case FluentuiNorthstarThemeList.teamsTheme:
    case FluentuiNorthstarThemeList.teamsV2Theme:
    default:
      return themeNames.Default;
  }
}
