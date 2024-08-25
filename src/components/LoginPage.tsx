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
        <CustomBtn></CustomBtn>
        <FindContainer>
          <FindBtn>아이디 찾기</FindBtn>
          <Separator />
          <FindBtn>비밀번호 찾기</FindBtn>
          <Separator />
          <FindBtn>회원가입</FindBtn>
        </FindContainer>
        <SnsLogin>
          <SnsText>SNS 계정으로 로그인</SnsText>
          <KakaoIcon></KakaoIcon>
        </SnsLogin>
      </LoginInput>
    </LoginMain>
  );
}

const LoginMain = styled.div`
  color: white;
  font-size: 28px;
  margin-top: 50px;
`;

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
  margin-bottom: 32px;
`;

const FindContainer = styled.div`
  display: flex;
  width: 100%;
  height: 17px;
  justify-content: center;
  margin-bottom: 96px;
`;

const FindBtn = styled.div`
  font-size: 14px;
  margin-left: 16px;
  margin-right: 16px;
  justify-items: center;
  color: #959595;
`;

const Separator = styled.div`
  width: 1px;
  height: 17px;
  background-color: #959595;
`;

const SnsLogin = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const SnsText = styled.div`
  height: 17px;
  font-size: 14px;
  color: #959595;
`;
const KakaoIcon = styled.div`
  background-image: url("../images/kakao.png");
  width: 48px;
  height: 48px;
  background-position: center;
  background-size: cover;
`;

export default LoginPage;
