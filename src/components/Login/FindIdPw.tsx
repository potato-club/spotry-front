import styled from "styled-components";

const FindIdPw = () => {
  return (
    <FindContainer>
      <FindBtn>아이디 찾기</FindBtn>
      <Separator />
      <FindBtn>비밀번호 찾기</FindBtn>
      <Separator />
      <FindBtn>회원가입</FindBtn>
    </FindContainer>
  );
};

const FindContainer = styled.div`
  display: flex;
  width: 100%;
  height: 17px;
  justify-content: center;
  margin-bottom: 96px;
  margin-top: 32px;
`;

const FindBtn = styled.div`
  font-size: 14px;
  margin-left: 16px;
  margin-right: 16px;
  justify-items: center;
  color: #959595;
  &:hover {
    cursor: pointer;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 17px;
  background-color: #959595;
`;

export default FindIdPw;
