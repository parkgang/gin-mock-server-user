import { GetConfig } from "libs/api/config";
import { useQuery } from "react-query";

const createKey = () => ["config"];

export default function useConfigQuery() {
  const { data } = useQuery(createKey(), GetConfig);

  if (data === undefined) {
    throw new Error("config 값이 존재하지 않습니다.");
  }

  return data;
}
