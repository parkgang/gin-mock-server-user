import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingCard } from "components/Loading";
import ErrorFallback from "components/ErrorFallback";

import { handlerOnError } from "libs/error";

import UserCard from "./UserCard";

function index() {
  return (
    <>
      <ErrorBoundary
        fallbackRender={({ error }) => <ErrorFallback title="문제가 발생했어요!" error={error} />}
        onError={handlerOnError}
      >
        <Suspense fallback={<LoadingCard />}>
          <UserCard />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default index;
