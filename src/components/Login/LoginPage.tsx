import styled from "styled-components";
import IdPwInput from "./IdPwInput";
import FindIdPw from "./FindIdPw";
import SnsSignIn from "./SnsSignIn";

const LoginPage = () => {
  return (
    <LoginMain>
      새로운 운동
      <br /> 커뮤니티의 시작
      <IdPwInput />
      <FindIdPw />
      <SnsSignIn />
    </LoginMain>
  );
};

const LoginMain = styled.div`
  color: white;
  font-size: 28px;
  margin-top: 50px;
`;

export default LoginPage;
