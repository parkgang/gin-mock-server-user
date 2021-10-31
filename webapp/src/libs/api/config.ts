import client from "libs/api/client";
import { Config } from "types/config";
import VError from "verror";

export async function GetConfig() {
  try {
    const { data } = await client.get<Config>(`/configs`);
    return data;
  } catch (error) {
    const message = `config 값을 가져오지 못함`;
    if (error instanceof Error) {
      throw new VError(error, message);
    }
    throw new Error(`${message}: ${error}`);
  }
}
