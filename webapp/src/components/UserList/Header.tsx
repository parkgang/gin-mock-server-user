import { Flex, Input, SearchIcon, Button, ParticipantAddIcon } from "@fluentui/react-northstar";

import useKeyword from "hooks/useKeyword";

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
        <Button
          primary
          style={{
            minWidth: "0",
            padding: "0",
            width: "2.5rem",
          }}
          content={<ParticipantAddIcon />}
        />
      </Flex>
    </>
  );
}
