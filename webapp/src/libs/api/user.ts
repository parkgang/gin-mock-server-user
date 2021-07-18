import { TUser, TUserForm } from "types/user";

import client from "./client";

export async function getUser() {
  const { data } = await client.get<TUser[]>(`/users`);
  return data;
}

export async function PutUser(id: number, user: TUserForm) {
  await client.put(`/users/${id}`, user);
}

export async function deleteUser(id: number) {
  await client.delete(`/users/${id}`);
}
