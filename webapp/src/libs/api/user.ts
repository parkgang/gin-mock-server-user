import axios from "axios";
import client from "libs/api/client";
import { User, UserDTO } from "types/user";

export type UserFormApi = typeof postUser | typeof putUser;

export async function postUser(user: UserDTO) {
  await client.post(`/users`, user);
}

export async function getUser() {
  try {
    const { data } = await client.get<User[]>(`/users`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 404:
          return null;
      }
    }
  }
}

export async function putUser(user: UserDTO, id: number) {
  await client.put(`/users/${id}`, user);
}

export async function deleteUser(id: number) {
  await client.delete(`/users/${id}`);
}
