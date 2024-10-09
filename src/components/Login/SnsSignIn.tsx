import styled from "styled-components";

function SnsSignIn() {
  return (
    <SnsLogin>
      <SnsText>SNS 계정으로 로그인</SnsText>
      <KakaoIcon></KakaoIcon>
    </SnsLogin>
  );
}

const SnsLogin = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const SnsText = styled.div`
  height: 17px;
  font-size: 14px;
  color: #959595;
  margin-bottom: 15px;
`;
const KakaoIcon = styled.div`
  width: 48px;
  height: 48px;
  background-position: center;
  background-size: cover;
  background-image: url("/images/kakao1.png");
  &:hover {
    cursor: pointer;
  }
`;

export default SnsSignIn;
