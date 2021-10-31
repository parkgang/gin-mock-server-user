import VError from "verror";

export function handlerOnError(error: Error, info: { componentStack: string }) {
  console.error({
    error,
    componentStack: info.componentStack,
  });
}

/**
 * VError으로 Wrap된 에러의 시작을 찾습니다.
 */
export function getErrorsCause(err: Error): Error {
  const maxLoop = 100;

  for (let i = 0; i < maxLoop; i++) {
    const cause = VError.cause(err);
    if (cause === null) {
      return err;
    }
    err = cause as VError;
  }

  throw new Error(
    `${maxLoop} 순회 결과 VError의 시작 Error를 찾지 못하였습니다`
  );
}
