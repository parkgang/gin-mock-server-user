import { Button, Flex, Header } from "@fluentui/react-northstar";
import ConfirmDialog from "components/molecules/ConfirmDialog";
import { deleteUser } from "libs/api/user";
import { nestedError } from "libs/error";
import { cloneElement, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useQueryClient } from "react-query";

type Props = {
  id: number;
  trigger: JSX.Element;
};

export default function ConfirmDelete({ id, trigger }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleError = useErrorHandler();
  const queryClient = useQueryClient();

  function handleTrigger() {
    setIsOpen(true);
  }
  function handleCancel() {
    setIsOpen(false);
  }
  async function handleDelete() {
    try {
      await deleteUser(id);
      queryClient.invalidateQueries("userList");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        nestedError(`handleDelete 에러`, error);
      }
      handleError(error);
    }
  }

  return (
    <>
      {cloneElement(trigger, {
        onClick: handleTrigger,
      })}
      <ConfirmDialog
        isOpen={isOpen}
        content={
          <>
            <Header
              as="h2"
              content="삭제하시겠습니까?"
              style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
            />
            <Flex gap="gap.small">
              <Button content="삭제" primary onClick={handleDelete} />
              <Button content="취소" onClick={handleCancel} />
            </Flex>
          </>
        }
      />
    </>
  );
}
