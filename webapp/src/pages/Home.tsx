import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Flex } from "@fluentui/react-northstar";

import { LoadingCard } from "components/Loading";
import { UserCard, Header } from "components/UserList";
import ErrorFallback from "components/ErrorFallback";
import { handlerOnError } from "libs/error";

export default function Home() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorFallback
            title="Home 화면에서 문제가 발생했어요"
            error={error}
          />
        )}
        onError={handlerOnError}
      >
        <Flex column gap="gap.small">
          <Header />
          <Suspense fallback={<LoadingCard />}>
            <UserCard />
          </Suspense>
        </Flex>
      </ErrorBoundary>
    </>
  );
}
