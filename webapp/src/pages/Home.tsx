import { Suspense } from "react";
import { Flex } from "@fluentui/react-northstar";

import { LoadingCard } from "components/Loading";
import { UserCard, Header } from "components/UserList";

export default function Home() {
  return (
    <>
      <Flex column gap="gap.small">
        <Header />
        <Suspense fallback={<LoadingCard />}>
          <UserCard />
        </Suspense>
      </Flex>
    </>
  );
}
