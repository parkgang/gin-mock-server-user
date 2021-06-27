import { ReactNode } from "react";
import { Flex } from "@fluentui/react-northstar";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <>
      <Flex fill gap="gap.small" hAlign="center">
        <Flex column style={{ width: "70vw" }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}
