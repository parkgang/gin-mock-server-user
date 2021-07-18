import { User, UserDTO } from "types/user";

import client from "./client";

export type UserFormApi = typeof PutUser | typeof PostUser;

export async function PostUser(user: UserDTO) {
  await client.post(`/users`, user);
}

export async function GetUser() {
  const { data } = await client.get<User[]>(`/users`);
  return data;
}

export async function PutUser(user: UserDTO, id: number) {
  await client.put(`/users/${id}`, user);
}

export async function DeleteUser(id: number) {
  await client.delete(`/users/${id}`);
}
