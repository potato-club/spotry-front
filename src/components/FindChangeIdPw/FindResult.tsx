import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ResultText } from "../../styles/ShareStyles";

const maskID = (id: string): string => {
  if (id.length <= 2) return id[0] + "*";
  if (id.length <= 4) {
    return id[0] + "*".repeat(id.length - 2) + id[id.length - 1];
  }

  const visibleChars = 2;
  const maskedPart = "*".repeat(id.length - visibleChars * 2);

  return id.slice(0, visibleChars) + maskedPart + id.slice(-visibleChars);
};

const FindResult: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const handleBack = () => navigate("/loginPage");

  const displayedID = params.userId ? maskID(params.userId) : "";

  return (
    <ResultContainer>
      <ResultText>
        회원님의 아이디는 <strong>{displayedID}</strong> 입니다.
      </ResultText>
      <BackButton onClick={handleBack}>로그인 페이지로 가기</BackButton>
    </ResultContainer>
  );
};

const ResultContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #76ff03;
  border: none;
  border-radius: 8px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #64dd17;
  }
`;

export default FindResult;
