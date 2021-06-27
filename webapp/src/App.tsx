import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import { useRecoilValue } from "recoil";

import About from "pages/About";
import Home from "pages/Home";
import Users from "pages/Users";
import NotFound from "pages/NotFound";

import { themeState } from "states/fluentui-northstar";

import AppLayout from "components/AppLayout";
import Header from "components/Header";

export default function App() {
  const theme = useRecoilValue(themeState);

  return (
    <FluentuiNorthstarProvider theme={theme}>
      <AppLayout>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/about" component={About} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AppLayout>
    </FluentuiNorthstarProvider>
  );
}
