import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import { useRecoilValue } from "recoil";

import About from "./pages/About";
import Home from "./pages/Home";
import Users from "./pages/Users";

import { themeState } from "./states/fluentui-northstar";

export default function App() {
  const theme = useRecoilValue(themeState);

  return (
    <FluentuiNorthstarProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/users" component={Users} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </FluentuiNorthstarProvider>
  );
}
