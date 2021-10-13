import Logo from "components/Brand/Logo";
import useConfigQuery from "hooks/query/useConfigQuery";

export default function Users() {
  const config = useConfigQuery();

  function handleKakaoLogin() {
    const clientId = config.kakao.restApiKey;
    const redirectUri = config.kakao.redirectUri;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }
  return (
    <>
      <Logo />
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </>
  );
}
