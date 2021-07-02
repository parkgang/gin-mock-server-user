import client from "./client";

export type User = {
  id: number;
  name: string;
  arg: number;
};

export async function getUser() {
  const { data } = await client.get<User[]>(`/users`);
  return data;
}
