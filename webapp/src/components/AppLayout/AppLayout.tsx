import { ReactNode } from "react";
import { Flex } from "@fluentui/react-northstar";

type Props = {
  children: ReactNode;
};

function AppLayout({ children }: Props) {
  return (
    <>
      <Flex fill hAlign="center" style={{ padding: "0.5rem" }}>
        <Flex column gap="gap.small" style={{ width: "70vw" }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default AppLayout;
