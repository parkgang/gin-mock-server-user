import { User, UserDTO } from "types/user";

import client from "./client";

export interface UserFormApi {
  (id: number, user: UserDTO): Promise<void>;
}

export async function GetUser() {
  const { data } = await client.get<User[]>(`/users`);
  return data;
}

export async function PutUser(id: number, user: UserDTO) {
  await client.put(`/users/${id}`, user);
}

export async function DeleteUser(id: number) {
  await client.delete(`/users/${id}`);
}
