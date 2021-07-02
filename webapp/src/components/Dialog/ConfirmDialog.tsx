import { useRef, useEffect, ReactNode } from "react";

import { Dialog, Flex, Ref } from "@fluentui/react-northstar";

type Props = {
  isOpen: boolean;
  content: ReactNode;
};

function ConfirmDialog({ isOpen, content }: Props) {
  const parentDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentDialogRef.current !== null) {
      // parentDialogRef.current.childNodes[1].childNodes[0].childNodes[0].style.margin = 0;
      const dialogBody = parentDialogRef.current.childNodes[1].childNodes[0].childNodes[0];
      (dialogBody as HTMLDivElement).style.margin = "0";
    }
  }, [isOpen]);

  return (
    <>
      <Ref innerRef={parentDialogRef}>
        <Dialog
          open={isOpen}
          styles={{ width: "20rem" }}
          content={
            <Flex column gap="gap.small" hAlign="center">
              {content}
            </Flex>
          }
        />
      </Ref>
    </>
  );
}

export default ConfirmDialog;
