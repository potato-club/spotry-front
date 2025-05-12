import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, ResultText } from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";

const ResetSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Title>비밀번호 변경 완료</Title>
      <ResultText>비밀번호가 성공적으로 변경되었습니다.</ResultText>
      <Btn onClick={handleGoLogin}>로그인 페이지로 돌아가기</Btn>
    </Container>
  );
};

export default ResetSuccess;
