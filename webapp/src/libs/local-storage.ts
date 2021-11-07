import { ThemePrepared } from "@fluentui/react-northstar";
import {
  getFluentuiNorthstarThemeToString,
  getStringToFluentuiNorthstarTheme,
} from "types/fluentui-northstar";

import { name } from "../../package.json";

const themeKey = `${name}-theme`;
const accessTokenKey = `${name}-accessToken`;
const refreshTokenKey = `${name}-refreshToken`;

export function getLocalStorageTheme() {
  return getStringToFluentuiNorthstarTheme(localStorage.getItem(themeKey));
}
export function setLocalStorageTheme(theme: ThemePrepared) {
  localStorage.setItem(themeKey, getFluentuiNorthstarThemeToString(theme));
}

export function getLocalStorageAccessToken() {
  return localStorage.getItem(accessTokenKey);
}
export function setLocalStorageAccessToken(token: string) {
  localStorage.setItem(accessTokenKey, token);
}
export function delLocalStorageAccessToken(token: string) {
  localStorage.removeItem(accessTokenKey);
}

export function getLocalStorageRefreshToken() {
  return localStorage.getItem(refreshTokenKey);
}
export function setLocalStorageRefreshToken(token: string) {
  localStorage.setItem(refreshTokenKey, token);
}
export function delLocalStorageRefreshToken(token: string) {
  localStorage.removeItem(refreshTokenKey);
}
