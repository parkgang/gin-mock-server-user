import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Flex } from "@fluentui/react-northstar";

import { LoadingCard } from "components/Loading";
import ErrorFallback from "components/ErrorFallback";
import { UserCard, Header } from "components/UserList";

import { handlerOnError } from "libs/error";

export default function Home() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <ErrorFallback
            title="홈 페이지에서 문제가 발생했어요!"
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
