import styled from "styled-components";
import { Btn as OrginalBtn } from "../../styles/Container";

const IdPwInput = () => {
  return (
    <LoginInput>
      <IdInput></IdInput>
      <PasswordInput></PasswordInput>
      <CustomBtn>로그인</CustomBtn>
    </LoginInput>
  );
};

const LoginInput = styled.div`
  width: 343px;
  height: 200px;
  margin-top: 32px;
`;

const IdInput = styled.input`
  width: 343px;
  height: 56px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: none;
  padding: 0;
  background-color: #444444;
`;
const PasswordInput = styled.input`
  width: 343px;
  height: 56px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: none;
  padding: 0;
  background-color: #444444;
`;

const CustomBtn = styled(OrginalBtn)`
  width: 343px;
  height: 56px;
  font-size: 16px;
  color: #000000;
`;

export default IdPwInput;
