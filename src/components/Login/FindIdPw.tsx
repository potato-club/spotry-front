import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FindIdPw = () => {
  const navigate = useNavigate();

  const toSignup = () => {
    navigate("/signup");
  };

  const toFindIdPw = () => {
    navigate("/findPage");
  };
  const toChangePw = () => {
    navigate("/findPage");
  };

  return (
    <FindContainer>
      <FindBtn onClick={toFindIdPw}>아이디 찾기</FindBtn>
      <Separator />
      <FindBtn onClick={toChangePw}>비밀번호 찾기</FindBtn>
      <Separator />
      <FindBtn onClick={toSignup}>회원가입</FindBtn>
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
