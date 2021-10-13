import client from "libs/api/client";
import { nestedError } from "libs/error";
import { Config } from "types/config";

export async function GetConfig() {
  try {
    const { data } = await client.get<Config>(`/configs`);
    return data;
  } catch (error) {
    nestedError(`config 값을 가져오지 못함`, error);
    throw error;
  }
}
