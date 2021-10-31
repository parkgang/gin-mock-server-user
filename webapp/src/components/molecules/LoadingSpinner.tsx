import { Loader } from "@fluentui/react-northstar";
import { CSSProperties } from "react";

type Props = {
  message: string;
  style?: CSSProperties | undefined;
};

export default function LoadingSpinner({ message, style }: Props) {
  return (
    <>
      <Loader size="large" label={message} style={style} />
    </>
  );
}
