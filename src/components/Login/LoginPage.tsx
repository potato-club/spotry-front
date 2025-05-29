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
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  margin-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  text-align: center;
`;

export default LoginPage;
