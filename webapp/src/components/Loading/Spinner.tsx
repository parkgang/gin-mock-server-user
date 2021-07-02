import { Flex, Loader } from "@fluentui/react-northstar";

type Props = {
  message: string;
};

function Spinner({ message }: Props) {
  return (
    <>
      <Flex fill hAlign="center" vAlign="center">
        <Loader size="large" label={message} />
      </Flex>
    </>
  );
}

export default Spinner;
