import { Flex, Segment } from "@fluentui/react-northstar";

import BreadCrumb from "../components/BreadCrumb";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <BreadCrumb />
      <Flex fill column vAlign="center" gap="gap.small" style={{ padding: "1rem" }}>
        <Segment color="brand">
          <Header />
          <Footer />
        </Segment>
      </Flex>
    </>
  );
}
