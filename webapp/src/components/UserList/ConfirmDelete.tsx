import { useState, cloneElement } from "react";
import { useQueryClient } from "react-query";
import { useErrorHandler } from "react-error-boundary";
import { Flex, Button, Header } from "@fluentui/react-northstar";

import { ConfirmDialog } from "components/Dialog";

import { DeleteUser } from "libs/api/user";
import { WrapError } from "libs/error";

type Props = {
  id: number;
  trigger: JSX.Element;
};

export default function ConfirmDelete({ id, trigger }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleError = useErrorHandler();
  const queryClient = useQueryClient();

  function handlerTrigger() {
    setIsOpen(true);
  }
  function handlerCancel() {
    setIsOpen(false);
  }
  async function handlerDelete() {
    try {
      await DeleteUser(id);
      queryClient.invalidateQueries("userList");
      setIsOpen(false);
    } catch (error) {
      WrapError(error, `handlerDelete 에러`);
      handleError(error);
    }
  }

  return (
    <>
      {cloneElement(trigger, {
        onClick: handlerTrigger,
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
              <Button content="삭제" primary onClick={handlerDelete} />
              <Button content="취소" onClick={handlerCancel} />
            </Flex>
          </>
        }
      />
    </>
  );
}
