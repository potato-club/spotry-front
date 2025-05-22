import styled from "styled-components";
import { Btn as OrginalBtn } from "../../styles/Container";
import useLoginInput from "../../hook/useLoginInput";
import { loginUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { getUserRegion } from "../../api/regionApi";

const IdPwInput: React.FC = () => {
  const navigation = useNavigate();

  const idInput = useLoginInput("아이디 입력");
  const passwordInput = useLoginInput("비밀번호 입력");

  const handleLogin = async () => {
    if (idInput.value !== " " || passwordInput.value !== " ") {
      try {
        const response = await loginUser({
          userId: idInput.value,
          userPw: passwordInput.value,
        });
        if (response?.status === 200) {
          try {
            const selected = await getUserRegion();
            console.log(selected);
            navigation("/main");
          } catch (error) {
            navigation("/location");
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("아이디와 비밀번호를 입력하세요");
    }
  };

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
      <CustomBtn onClick={handleLogin}>로그인</CustomBtn>
    </LoginInput>
  );
};

const LoginInput = styled.div`
  width: ${({ theme }) => theme.sizes.component.loginInput.width};
  height: ${({ theme }) => theme.sizes.component.loginInput.height};
  margin-top: ${({ theme }) => theme.sizes.spacing.xxl};
`;

const IdInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.sizes.component.input.xlarge.height};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
  border-radius: ${({ theme }) => theme.sizes.spacing.sm};
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-indent: ${({ theme }) => theme.sizes.spacing.md};
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.interactive.focus};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;
const PasswordInput = styled.input`
  width: 100%;
  height: ${({ theme }) => theme.sizes.component.input.xlarge.height};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
  border-radius: ${({ theme }) => theme.sizes.spacing.sm};
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-indent: ${({ theme }) => theme.sizes.spacing.md};
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.interactive.focus};
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const CustomBtn = styled(OrginalBtn)`
  width: ${({ theme }) => theme.sizes.component.button.xlarge.width};
  height: ${({ theme }) => theme.sizes.component.button.xlarge.height};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.utility.black};
`;
//2B2B2B
export default IdPwInput;
