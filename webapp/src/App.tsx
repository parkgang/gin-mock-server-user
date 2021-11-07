import { Provider as FluentuiNorthstarProvider } from "@fluentui/react-northstar";
import LoadingSpinner from "components/molecules/LoadingSpinner";
import ErrorFallback from "components/wrapped/ErrorFallback";
import { handlerOnError } from "libs/error";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Routes } from "react-router-dom";
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
const AuthEnd = lazy(() => import("components/pages/AuthEnd"));
const NotFound = lazy(() => import("components/pages/NotFound"));

export const HomePath = "/";
export const UsersPath = "/users";
export const SignInPath = "/sign-in";
export const SignUpPath = "/sign-up";
export const AuthEndPath = "/auth-end";

export default function App() {
  const theme = useRecoilValue(FluentuiNorthstarThemeState);

  return (
    <>
      <FluentuiNorthstarProvider theme={theme}>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={handlerOnError}
        >
          <Suspense
            fallback={
              <LoadingSpinner
                message="페이지 불러오는 중..."
                style={{ height: "100vh" }}
              />
            }
          >
            <Routes>
              <Route path={HomePath} element={<Home />} />
              <Route path={UsersPath} element={<Users />} />
              <Route path={SignInPath} element={<SignIn />} />
              <Route path={SignUpPath} element={<SignUp />} />
              <Route path={AuthEndPath} element={<AuthEnd />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </FluentuiNorthstarProvider>
      <GlobalStyle />
      <FluentuiNorthstarThemeEffect />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
