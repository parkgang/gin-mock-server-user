import { nestedError } from "libs/error";
import { Config } from "types/config";
import client from "libs/api/client";

export async function GetConfig() {
  try {
    const { data } = await client.get<Config>(`/configs`);
    return data;
  } catch (error) {
    nestedError(`config 값을 가져오지 못함`, error);
    throw error;
  }
}
