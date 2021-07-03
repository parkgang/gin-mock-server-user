import { Flex } from "@fluentui/react-northstar";

import UserList, { Header } from "components/UserList";

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
