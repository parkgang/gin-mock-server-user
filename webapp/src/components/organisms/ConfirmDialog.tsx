import { Button, Flex, Header } from "@fluentui/react-northstar";
import DialogFrame from "components/molecules/DialogFrame";
import { cloneElement, useState } from "react";

type Props = {
  trigger: JSX.Element;
  message: string;
  cancelContent: string;
  confirmContent: string;
  onCancel(): void;
  onConfirm(): void;
};

export default function ConfirmDialog({
  trigger,
  message,
  cancelContent,
  confirmContent,
  onCancel,
  onConfirm,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleTrigger() {
    setIsOpen(true);
  }
  function handleCancel() {
    onCancel();
    setIsOpen(false);
  }
  function handleConfirm() {
    onConfirm();
    setIsOpen(false);
  }

  return (
    <>
      {cloneElement(trigger, {
        onClick: handleTrigger,
      })}
      <DialogFrame
        isOpen={isOpen}
        content={
          <>
            <Header
              as="h2"
              content={message}
              style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
            />
            <Flex gap="gap.small">
              <Button content={cancelContent} onClick={handleCancel} />
              <Button
                content={confirmContent}
                onClick={handleConfirm}
                primary
              />
            </Flex>
          </>
        }
      />
    </>
  );
}
