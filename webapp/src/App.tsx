import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import AppLayout from "components/AppLayout";
import ErrorFallback from "components/ErrorFallback";
import Header from "components/Header";
import Spinner from "components/Loading";
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

const About = lazy(() => import("pages/About"));
const Users = lazy(() => import("pages/Users"));
const Home = lazy(() => import("pages/Home"));
const SignIn = lazy(() => import("pages/SignIn"));
const SignUp = lazy(() => import("pages/SignUp"));
const NotFound = lazy(() => import("pages/NotFound"));

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
      <main>
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
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
