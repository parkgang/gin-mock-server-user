import client from "libs/api/client";
import { errorWrap } from "libs/error";
import {
  getLocalStorageAccessToken,
  setLocalStorageAccessToken,
  setLocalStorageRefreshToken,
} from "libs/local-storage";
import { JWTToken } from "types/jwt-token";
import { UserDTO, UserInfo } from "types/user";

export async function PostUser(user: UserDTO): Promise<void> {
  try {
    await client.post(`/users/signup`, user);
  } catch (error) {
    throw errorWrap(error, `${PostUser.name}() 에러`);
  }
}

export async function UserLogin(
  email: string,
  password: string
): Promise<void> {
  try {
    const { data } = await client.post<JWTToken>(`/users/login`, {
      email: email,
      password: password,
    });
    setLocalStorageAccessToken(data.accessToken);
    setLocalStorageRefreshToken(data.refreshToken);
  } catch (error) {
    throw errorWrap(error, `${UserLogin.name}() 에러`);
  }
}

export async function GetUserInfo(): Promise<UserInfo> {
  try {
    const accessToken = getLocalStorageAccessToken();
    const { data } = await client.get<UserInfo>(`/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    throw errorWrap(error, `${GetUserInfo.name}() 에러`);
  }
}
