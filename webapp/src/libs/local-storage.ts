import { ThemePrepared } from "@fluentui/react-northstar";

import { name } from "../../package.json";
import {
  getFluentuiNorthstarThemeToString,
  getStringToFluentuiNorthstarTheme,
} from "types/fluentui-northstar";

const themeKey = `${name}-theme`;

export function getLocalStorageTheme() {
  return getStringToFluentuiNorthstarTheme(localStorage.getItem(themeKey));
}

export function setLocalStorageTheme(theme: ThemePrepared) {
  localStorage.setItem(themeKey, getFluentuiNorthstarThemeToString(theme));
}
