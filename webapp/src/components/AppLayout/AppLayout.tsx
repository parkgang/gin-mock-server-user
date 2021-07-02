import { ReactNode } from "react";
import { Flex } from "@fluentui/react-northstar";

type Props = {
  children: ReactNode;
};

function AppLayout({ children }: Props) {
  return (
    <>
      <Flex hAlign="center" style={{ height: "100vh", padding: "0.5rem" }}>
        <Flex column gap="gap.small" style={{ width: "50vw" }}>
          {children}
        </Flex>
      </Flex>
    </>
  );
}

export default AppLayout;
