import { ThemePrepared } from "@fluentui/react-northstar";
import {
  getFluentuiNorthstarThemeToString,
  getStringToFluentuiNorthstarTheme,
} from "types/fluentui-northstar";

import { name } from "../../package.json";

const themeKey = `${name}-theme`;

export function getLocalStorageTheme() {
  return getStringToFluentuiNorthstarTheme(localStorage.getItem(themeKey));
}

export function setLocalStorageTheme(theme: ThemePrepared) {
  localStorage.setItem(themeKey, getFluentuiNorthstarThemeToString(theme));
}
