import axios from "axios";
import client from "libs/api/client";
import { errorWrap, getErrorsCause } from "libs/error";
import {
  delLocalStorageAccessToken,
  delLocalStorageRefreshToken,
  getLocalStorageAccessToken,
  getLocalStorageRefreshToken,
  setLocalStorageAccessToken,
  setLocalStorageRefreshToken,
} from "libs/local-storage";
import { JWTRefreshToken, JWTToken } from "types/jwt-token";
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
  async function work() {
    const accessToken = getLocalStorageAccessToken();
    const { data } = await client.get<UserInfo>(`/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  }
  try {
    return await work();
  } catch (error) {
    if (error instanceof Error) {
      const cause = getErrorsCause(error);
      if (axios.isAxiosError(cause)) {
        switch (cause.response?.status) {
          case 401:
            // 재시도: 리프레쉬 토큰으로 엑세스 토큰을 다시 발급
            await TokenRefresh();
            return await work();
        }
      }
    }
    throw errorWrap(error, `${GetUserInfo.name}() 에러`);
  }
}

export async function TokenRefresh(): Promise<void> {
  try {
    const refreshToken = getLocalStorageRefreshToken();
    if (refreshToken === null) {
      throw new Error("refreshToken이 없습니다.");
    }
    const body: JWTRefreshToken = {
      refreshToken: refreshToken,
    };
    const { data } = await client.post<JWTToken>(`/users/token/refresh`, body);
    setLocalStorageAccessToken(data.accessToken);
    setLocalStorageRefreshToken(data.refreshToken);
  } catch (error) {
    throw errorWrap(error, `${TokenRefresh.name}() 에러`);
  }
}

export async function UserLogout(): Promise<void> {
  try {
    const accessToken = getLocalStorageAccessToken();
    delLocalStorageAccessToken();
    delLocalStorageRefreshToken();
    await client.post(`/users/logout`, undefined, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      const cause = getErrorsCause(error);
      if (axios.isAxiosError(cause)) {
        switch (cause.response?.status) {
          case 401:
            // 로그아웃한 토큰이 만료된 경우 해당 에러는 무시합니다: 그래서 로그아웃 요청전에 Client Side에서 미리 토큰을 지우도록 합니다.
            return;
        }
      }
    }
    throw errorWrap(error, `${UserLogout.name}() 에러`);
  }
}
