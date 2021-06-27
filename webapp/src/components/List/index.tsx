import { Suspense } from "react";

import Loading from "components/Loading";

import List from "./List";

function index() {
  return (
    <>
      <Suspense fallback={<Loading message="로딩 중" />}>
        <List />
      </Suspense>
    </>
  );
}

export default index;
