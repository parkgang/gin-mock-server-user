import client from "libs/api/client";
import { errorWrap } from "libs/error";
import { UserDTO } from "types/user";

export async function PostUser(user: UserDTO): Promise<void> {
  try {
    await client.post(`/users/signup`, user);
  } catch (error) {
    throw errorWrap(error, `${PostUser.name}() 에러`);
  }
}
