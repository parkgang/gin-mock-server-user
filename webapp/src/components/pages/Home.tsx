import { Flex } from "@fluentui/react-northstar";
import LoadingCard from "components/organisms/LoadingCard";
import UserCard from "components/organisms/UserCard";
import UserListHeader from "components/organisms/UserListHeader";
import ErrorFallback from "components/wrapped/ErrorFallback";
import useKeyword from "hooks/useKeyword";
import { handlerOnError } from "libs/error";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  const [name, , onChangeKeyword] = useKeyword("");

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
        <Flex
          column
          gap="gap.small"
          style={{ overflowX: "hidden", overflowY: "scroll" }}
        >
          <UserListHeader value={name} onChange={onChangeKeyword} />
          <Suspense fallback={<LoadingCard />}>
            <UserCard searchKeyword={name} />
          </Suspense>
        </Flex>
      </ErrorBoundary>
    </>
  );
}
