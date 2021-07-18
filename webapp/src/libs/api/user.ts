import { User, UserDTO } from "types/user";

import client from "./client";

export async function getUser() {
  const { data } = await client.get<User[]>(`/users`);
  return data;
}

export async function PutUser(id: number, user: UserDTO) {
  await client.put(`/users/${id}`, user);
}

export async function deleteUser(id: number) {
  await client.delete(`/users/${id}`);
}
