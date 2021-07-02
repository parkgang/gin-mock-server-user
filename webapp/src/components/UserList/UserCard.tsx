import { Children } from "react";
import { useQuery } from "react-query";
import {
  Flex,
  Card,
  CardBody,
  Label,
  Text,
  Button,
  TrashCanIcon,
  EditIcon,
} from "@fluentui/react-northstar";

import { getUser } from "libs/api/user";

import { LoadingCard } from "components/Loading";

import ConfirmDelete from "./ConfirmDelete";

function UserCard() {
  const { data: userList, isFetching } = useQuery("userList", getUser);
  if (userList === undefined) {
    // TODO: undefined 커스텀 에러를 만들어서 해당 에러의 경우에만 예쁜 에러 페이지를 보여줄 수 있도록 디자인
    throw new Error("userList 값이 존재하지 않습니다.");
  }

  if (isFetching) {
    return (
      <>
        <LoadingCard />
      </>
    );
  }

  if (userList.length === 0) {
    return (
      <>
        <h1>데이터가 없습니다.</h1>
      </>
    );
  }

  return (
    <>
      <Flex column gap="gap.smaller" style={{ overflowY: "scroll" }}>
        {Children.toArray(
          userList.map((x) => (
            <Card fluid style={{ padding: "0.5em" }}>
              <CardBody style={{ marginBottom: "0" }}>
                <Flex column gap="gap.small" vAlign="center">
                  <span>
                    <Label color="grey" content={x.id} />
                    &nbsp;&nbsp;
                    <Text content={x.name} weight="bold" />
                  </span>
                  <Flex gap="gap.small" vAlign="center" space="between">
                    <Text content={x.arg} size="small" />
                    <Flex gap="gap.small">
                      <ConfirmDelete
                        id={x.id}
                        trigger={
                          <Button
                            style={{
                              minWidth: "0",
                              padding: "0",
                              width: "2.5rem",
                            }}
                            content={<TrashCanIcon />}
                          />
                        }
                      />
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
