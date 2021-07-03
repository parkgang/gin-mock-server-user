import { useState, cloneElement } from "react";
import { useQueryClient } from "react-query";
import { useErrorHandler } from "react-error-boundary";
import { Button, Form, FormInput, Flex } from "@fluentui/react-northstar";

import { ConfirmDialog } from "components/Dialog";

import { WrapError } from "libs/error";

type Props = {
  id: number;
  trigger: JSX.Element;
};

export default function UserForm({ id, trigger }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleError = useErrorHandler();
  const queryClient = useQueryClient();

  function handlerTrigger() {
    setIsOpen(true);
  }
  async function handlerCreate() {
    try {
      alert("Form submitted");
      queryClient.invalidateQueries("userList");
      setIsOpen(false);
    } catch (error) {
      WrapError(error, `handlerDelete 에러`);
      handleError(error);
    }
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
            <Form onSubmit={handlerCreate}>
              <FormInput label="이름" name="name" required type="text" fluid />
              <FormInput label="나이" name="arg" required type="number" fluid />
              <Flex gap="gap.small" hAlign="center">
                <Button content="생성" primary />
                <Button content="취소" onClick={handlerCancel} />
              </Flex>
            </Form>
          </>
        }
      />
    </>
  );
}
