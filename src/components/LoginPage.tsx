import styled from "styled-components";
import { Btn as OrginalBtn } from "../styles/Container";

function LoginPage() {
  return (
    <LoginMain>
      새로운 운동
      <br /> 커뮤니티의 시작
      <LoginInput>
        <IdInput></IdInput>
        <PasswordInput></PasswordInput>
      </LoginInput>
      <CustomBtn></CustomBtn>
    </LoginMain>
  );
}

const LoginMain = styled.div`
  color: white;
  font-size: 28px;
`;

const LoginInput = styled.div``;

const IdInput = styled.input``;
const PasswordInput = styled.input``;

const CustomBtn = styled(OrginalBtn)`
  height: 56px;
  width: 343px;
`;

export default LoginPage;
