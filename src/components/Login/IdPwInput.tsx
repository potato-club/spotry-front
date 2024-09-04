import styled from "styled-components";
import { Btn as OrginalBtn } from "../../styles/Container";
import useLoginInput from "../../hook/useLoginInput";

const IdPwInput: React.FC = () => {
  const idInput = useLoginInput("아이디 입력");
  const passwordInput = useLoginInput("비밀번호 입력");

  return (
    <LoginInput>
      <IdInput
        placeholder={idInput.placeholder}
        value={idInput.value}
        onChange={(e) => idInput.setValue(e.target.value)}
        onFocus={idInput.onFocus}
        onBlur={idInput.onBlur}
      />
      <PasswordInput
        type="password"
        placeholder={passwordInput.placeholder}
        value={passwordInput.value}
        onChange={(e) => passwordInput.setValue(e.target.value)}
        onFocus={passwordInput.onFocus}
        onBlur={passwordInput.onBlur}
      />
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
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: none;
  padding: 0;
  background-color: #444444;
  color: #bbbbbb;
  text-indent: 15px;

  &:focus {
    border: 1px solid #c1f84d;
    outline: none;
  }
`;
const PasswordInput = styled.input`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  border-radius: 10px;
  border: none;
  padding: 0;
  background-color: #444444;
  color: #bbbbbb;
  text-indent: 15px;

  &:focus {
    border: 1px solid #c1f84d;
    outline: none;
  }
`;

const CustomBtn = styled(OrginalBtn)`
  width: 343px;
  height: 56px;
  font-size: 16px;
  color: #000000;
`;

export default IdPwInput;
