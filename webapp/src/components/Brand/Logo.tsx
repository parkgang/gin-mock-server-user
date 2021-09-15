import { ContentIcon } from "@fluentui/react-icons-northstar";
import styled from "styled-components";

const size = "15rem";

const Frame = styled.section`
  width: ${size};
  height: ${size};
  border: 0.8rem solid black;
  border-radius: 5%;
`;

const Icon = styled(ContentIcon)`
  & > svg {
    width: 100%;
    height: 100%;
  }
`;

export default function Logo() {
  return (
    <>
      <Frame>
        <Icon />
      </Frame>
    </>
  );
}
