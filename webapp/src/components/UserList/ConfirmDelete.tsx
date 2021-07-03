import { useState, cloneElement } from "react";
import { useQueryClient } from "react-query";
import { Flex, Button, Header } from "@fluentui/react-northstar";

import { ConfirmDialog } from "components/Dialog";

import { deleteUser } from "libs/api/user";

type Props = {
  id: number;
  trigger: JSX.Element;
};

export default function ConfirmDelete({ id, trigger }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();

  function handlerTrigger() {
    setIsOpen(true);
  }
  async function handlerDelete() {
    await deleteUser(id);
    queryClient.invalidateQueries("userList");
    setIsOpen(false);
  }
  function handlerCancel() {
    setIsOpen(false);
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
