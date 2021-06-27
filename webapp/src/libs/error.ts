export function handlerOnError(error: Error, info: { componentStack: string }) {
  console.log(error);
  console.log(info.componentStack);
}

export function WrapError(error: Error, message: string) {
  error.message = `${message} (${error.message})`;
}
