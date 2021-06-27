import { Breadcrumb } from "@fluentui/react-northstar";

import { useHistory } from "react-router-dom";

export default function BreadCrumb() {
  const history = useHistory();

  const goHome = () => history.push("/");
  const goAbout = () => history.push("/about");
  const goUsers = () => history.push("/users");

  return (
    <>
      <Breadcrumb aria-label="breadcrumb">
        <Breadcrumb.Item>
          <Breadcrumb.Link onClick={goHome}>Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Divider />
        <Breadcrumb.Item>
          <Breadcrumb.Link onClick={goAbout}>About</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Divider />
        <Breadcrumb.Item>
          <Breadcrumb.Link onClick={goUsers}>Users</Breadcrumb.Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
}
