import VError from "verror";

/**
 * react-error-boundary의 <ErrorBoundary /> 가 실행 시 실행되는 에러 핸들러 입니다.
 * 에러 로깅과 같은 것을 수행할 수 있습니다.
 * @param error 에러 값
 * @param info 에러 정보, 주로 컴포넌트 스텍을 보기위해 사용됩니다.
 */
export function handlerOnError(error: Error, info: { componentStack: string }) {
  console.error({
    error,
    componentStack: info.componentStack,
  });
}

/**
 * VError으로 Wrap된 에러의 시작을 찾습니다.
 * @param err 에러 값
 * @returns 에러 발생의 원인 값 (처음으로 throw된 에러 값을 반환합니다)
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

/**
 * 발생한 에러를 메시지와 함께 랩핑 해줍니다.
 * ts에서 에러 값이 unknown이라서 일일이 타입 확인이 귀찮은 경우 사용될 수 있습니다.
 * 또한, 일관성 있는 메시지 랩핑 포멧을 유지할 수 있습니다.
 * @param err 에러 값
 * @param message 랩핑할 메시지
 * @returns 랩핑된 에러 값
 */
export function errorWrap(err: unknown, message: string) {
  if (err instanceof Error) {
    return new VError(err, message);
  }
  return new Error(`${message}: ${err}`);
}
