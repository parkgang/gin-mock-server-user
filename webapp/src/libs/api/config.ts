import client from "libs/api/client";
import { errorWrap } from "libs/error";
import { Config } from "types/config";

export async function GetConfig() {
  try {
    const { data } = await client.get<Config>(`/configs`);
    return data;
  } catch (error) {
    throw errorWrap(error, `${GetConfig.name}() 에러`);
  }
}
