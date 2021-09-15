import Logo from "components/Brand/Logo";

export default function Users() {
  function handleKakaoLogin() {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=719bdcc7e418eba9b411b2b9b60f1c61&redirect_uri=http://localhost:8080/api/oauth/kakao-end&response_type=code";
  }
  return (
    <>
      <Logo />
      <button onClick={handleKakaoLogin}>카카오 로그인</button>
    </>
  );
}
