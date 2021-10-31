import Gnb from "components/organisms/Gnb";
import useDevice from "hooks/useDevice";
import { ReactNode } from "react";
import styled from "styled-components";

const FlexContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0.5rem;
`;

type TDeviceHandlingFlexContainer = {
  isMobile: boolean;
};

const DeviceHandlingFlexContainer = styled.div<TDeviceHandlingFlexContainer>`
  width: ${(props) => (props.isMobile ? "100%" : "80%")};
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Header = styled.header`
  flex-shrink: 0;
`;

const Content = styled.main`
  flex-grow: 1;
`;

type Props = {
  children: ReactNode;
};

export default function StandardLayout({ children }: Props) {
  const { isMobile } = useDevice();

  return (
    <>
      <FlexContainer>
        <DeviceHandlingFlexContainer isMobile={isMobile}>
          <Header>
            <Gnb />
          </Header>
          <Content>{children}</Content>
        </DeviceHandlingFlexContainer>
      </FlexContainer>
    </>
  );
}
