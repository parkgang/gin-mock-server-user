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
import { CommunicationOptions } from "@fluentui/react-teams";

import { GetUser, PutUser } from "libs/api/user";
import { Communication } from "components/ReactTeams";
import ConfirmDelete from "components/UserList/ConfirmDelete";
import { UserForm } from "components/Form";

export default function UserCard() {
  const { data: userList } = useQuery("userList", GetUser);
  if (userList === undefined) {
    // TODO: undefined 커스텀 에러를 만들어서 해당 에러의 경우에만 예쁜 에러 페이지를 보여줄 수 있도록 디자인
    throw new Error("userList 값이 존재하지 않습니다.");
  }

  function handleInteraction(target: string) {
    switch (target) {
      case "refresh":
        // window.location.reload(); 으로 새로고침 시도 시 에러가 발생한 url 그래도 새로고침되어 계속 에러가 발생한 queryString으로 돌아오므로 queryString을 제거하여 새로고침 하도록 합니다.
        window.location.href = window.location.href.split("?")[0];
        break;
    }
  }

  if (userList === null) {
    return (
      <>
        <Communication
          option={CommunicationOptions.Empty}
          fields={{
            title: `아직 사용자가 없습니다.`,
            desc: `사용자 할당되면 여기에서 찾을 수 있습니다. 그때까지 쉬는 시간을 즐기십시오.`,
            actions: {
              primary: {
                label: "새로고침",
                target: "refresh",
              },
            },
          }}
          onInteraction={({ target }) => handleInteraction(target)}
        />
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
                      <UserForm
                        id={x.id}
                        defaultValue={x}
                        trigger={
                          <Button
                            primary
                            style={{
                              minWidth: "0",
                              padding: "0",
                              width: "2.5rem",
                            }}
                            content={<EditIcon />}
                          />
                        }
                        onSubmit={PutUser}
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
