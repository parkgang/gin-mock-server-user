import { Children } from "react";
import {
  Flex,
  Card,
  CardBody,
  Label,
  Text,
  Button,
  FlexItem,
  TrashCanIcon,
  EditIcon,
} from "@fluentui/react-northstar";

const items = [
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
  {
    id: 1,
    arg: 22,
    name: "1번 사람",
  },
];

function UserCard() {
  return (
    <>
      <Flex column gap="gap.smaller">
        {Children.toArray(
          items.map((item) => (
            <Card fluid style={{ padding: "0.5em" }}>
              <CardBody style={{ marginBottom: "0" }}>
                <Flex column gap="gap.small" vAlign="center">
                  <span>
                    <Label color="grey" content={item.id} />
                    {"     "}
                    <Text content={item.name} weight="bold" />
                  </span>
                  <Flex gap="gap.small" vAlign="center">
                    <Text content={item.arg} size="small" />
                    <FlexItem push>
                      <Button
                        style={{
                          minWidth: "0",
                          padding: "0",
                          width: "2.5rem",
                        }}
                        content={<TrashCanIcon />}
                      />
                    </FlexItem>
                    <Button
                      primary
                      style={{
                        minWidth: "0",
                        padding: "0",
                        width: "2.5rem",
                      }}
                      content={<EditIcon />}
                    />
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          ))
        )}
      </Flex>
    </>
  );
}

export default UserCard;
