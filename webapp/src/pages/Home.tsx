import { Flex } from "@fluentui/react-northstar";

import Header from "components/UserList/Header";
import UserList from "components/UserList";

export default function Home() {
  return (
    <>
      <Flex column gap="gap.small">
        <Header />
        <UserList />
      </Flex>
    </>
  );
}
