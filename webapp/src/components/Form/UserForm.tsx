import { useState, cloneElement, SyntheticEvent } from "react";
import { useQueryClient } from "react-query";
import { useErrorHandler } from "react-error-boundary";
import { Button, Form, FormInput, Flex } from "@fluentui/react-northstar";

import { ConfirmDialog } from "components/Dialog";

import { UserFormApi } from "libs/api/user";
import { WrapError } from "libs/error";

import { UserDTO } from "types/user";

type UserFormValue = {
  [K in keyof UserDTO]: { value: string };
};

type Props = {
  id?: number;
  defaultValue?: UserDTO;
  trigger: JSX.Element;
  onSubmit: UserFormApi;
};

export default function UserForm({
  id,
  defaultValue = { name: "", arg: 0 },
  trigger,
  onSubmit,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlerError = useErrorHandler();
  const queryClient = useQueryClient();

  function handlerTrigger() {
    setIsOpen(true);
  }
  function handlerCancel() {
    setIsOpen(false);
  }
  async function handlerSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & UserFormValue;
      const name = target.name.value;
      const arg = target.arg.value;
      await onSubmit(
        {
          name: name,
          arg: parseInt(arg),
        },
        id as number
      );
      queryClient.invalidateQueries("userList");
      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        WrapError(error, `handlerDelete 에러`);
      }
      handlerError(error);
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
            <Form onSubmit={handlerSubmit}>
              <FormInput
                required
                fluid
                label="이름"
                name="name"
                type="text"
                defaultValue={defaultValue.name}
              />
              <FormInput
                required
                fluid
                label="나이"
                name="arg"
                type="number"
                defaultValue={defaultValue.arg.toString()}
              />
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
