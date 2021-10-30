import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import Spinner from "components/molecules/Spinner";
import Gnb from "components/organisms/Gnb";
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
import GlobalStyle from "styles/GlobalStyle";

const Home = lazy(() => import("components/pages/Home"));
const Users = lazy(() => import("components/pages/Users"));
const SignIn = lazy(() => import("components/pages/SignIn"));
const SignUp = lazy(() => import("components/pages/SignUp"));
const NotFound = lazy(() => import("components/pages/NotFound"));

export const HomePath = "/";
export const UsersPath = "/users";
export const SignInPath = "/sign-in";
export const SignUpPath = "/sign-up";

export default function App() {
  const theme = useRecoilValue(FluentuiNorthstarThemeState);

  return (
    <>
      <FluentuiNorthstarProvider theme={theme}>
        <AppLayout>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={handlerOnError}
          >
            <Suspense fallback={<Spinner message="페이지 불러오는 중..." />}>
              <Router>
                <Gnb />
                <Switch>
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
      <GlobalStyle />
      <FluentuiNorthstarThemeEffect />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
