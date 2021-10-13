import { selector } from "recoil";
import { FluentuiNorthstarThemeState } from "states/fluentui-northstar";
import { getFluentuiNorthstarThemeToString } from "types/fluentui-northstar";
import { mapWithFluentuiTeamsTheme } from "types/fluentui-teams";

export const FluentuiTeamsThemeState = selector({
  key: "FluentuiTeamsThemeState",
  get: ({ get }) => {
    const fluentuiNorthstarTheme = get(FluentuiNorthstarThemeState);
    return mapWithFluentuiTeamsTheme(
      getFluentuiNorthstarThemeToString(fluentuiNorthstarTheme)
    );
  },
});
