import { atom } from "recoil";
import { teamsTheme, ThemePrepared } from "@fluentui/react-northstar";

export const themeState = atom<ThemePrepared>({
  key: "themeState",
  default: teamsTheme,
});
