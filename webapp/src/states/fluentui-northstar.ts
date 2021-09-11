import { atom } from "recoil";
import { ThemePrepared } from "@fluentui/react-northstar";

import { GetLocalStorageTheme } from "libs/local-storage";

export const themeState = atom<ThemePrepared>({
  key: "themeState",
  default: GetLocalStorageTheme(),
});
