import {
  Flex,
  Input,
  SearchIcon,
  Button,
  ParticipantAddIcon,
} from "@fluentui/react-northstar";

import { UserForm } from "components/Form";

import useKeyword from "hooks/useKeyword";

import { PostUser } from "libs/api/user";

export default function Header() {
  const [name, , onChangeKeyword] = useKeyword("");

  return (
    <>
      <Flex gap="gap.small" space="between">
        <Input
          icon={<SearchIcon />}
          fluid
          clearable
          placeholder="이름으로 검색..."
          value={name}
          onChange={onChangeKeyword}
        />
        <UserForm
          trigger={
            <Button
              primary
              style={{
                minWidth: "0",
                padding: "0",
                width: "2.5rem",
              }}
              content={<ParticipantAddIcon />}
            />
          }
          onSubmit={PostUser}
        />
      </Flex>
    </>
  );
}
