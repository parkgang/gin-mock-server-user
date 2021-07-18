export type TUser = {
  id: number;
  name: string;
  arg: number;
};

export type TUserForm = Omit<TUser, "id">;
