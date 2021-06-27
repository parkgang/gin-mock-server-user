import { useQuery } from "react-query";

import { getUser } from "libs/api/user";

export default function List() {
  const { data: user } = useQuery("users", getUser);

  console.log(user);

  return (
    <>
      <h1>List</h1>
    </>
  );
}
