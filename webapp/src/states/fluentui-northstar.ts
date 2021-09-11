import { atom } from "recoil";
import { ThemePrepared } from "@fluentui/react-northstar";

import { GetLocalStorageTheme } from "libs/local-storage";

export const FluentuiNorthstarThemeState = atom<ThemePrepared>({
  key: "FluentuiNorthstarThemeState",
  default: GetLocalStorageTheme(),
});
