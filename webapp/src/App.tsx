import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import Spinner from "components/molecules/Loading";
import Header from "components/organisms/Header";
import AppLayout from "components/templates/AppLayout";
import ErrorFallback from "components/wrapped/ErrorFallback";
import { handlerOnError } from "libs/error";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  FluentuiNorthstarThemeEffect,
  FluentuiNorthstarThemeState,
} from "states/fluentui-northstar";

const About = lazy(() => import("components/pages/About"));
const Users = lazy(() => import("components/pages/Users"));
const Home = lazy(() => import("components/pages/Home"));
const SignIn = lazy(() => import("components/pages/SignIn"));
const SignUp = lazy(() => import("components/pages/SignUp"));
const NotFound = lazy(() => import("components/pages/NotFound"));

export const AboutPath = "/about";
export const UsersPath = "/users";
export const SignInPath = "/sign-in";
export const SignUpPath = "/sign-up";
export const HomePath = "/";

export default function App() {
  const theme = useRecoilValue(FluentuiNorthstarThemeState);

  return (
    <>
      <FluentuiNorthstarThemeEffect />
      <FluentuiNorthstarProvider theme={theme}>
        <AppLayout>
          <ErrorBoundary
            fallbackRender={({ error }) => <ErrorFallback error={error} />}
            onError={handlerOnError}
          >
            <Suspense fallback={<Spinner message="페이지 불러오는 중..." />}>
              <Router>
                <Header />
                <Switch>
                  <Route exact path={AboutPath} component={About} />
                  <Route exact path={HomePath} component={Home} />
                  <Route exact path={UsersPath} component={Users} />
                  <Route exact path={SignInPath} component={SignIn} />
                  <Route exact path={SignUpPath} component={SignUp} />
                  <Route component={NotFound} />
                </Switch>
              </Router>
            </Suspense>
          </ErrorBoundary>
        </AppLayout>
      </FluentuiNorthstarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
