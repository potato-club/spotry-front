import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Label,
  ResultText,
  ErrorText,
  Input,
} from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";

const ChangePW: React.FC = () => {
  const location = useLocation();
  const userId = (location.state as { userId?: string })?.userId;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 인증된 사용자 정보가 없으면 접근 차단
  if (!userId) {
    return (
      <Container>
        <ErrorText>
          잘못된 접근입니다. 먼저 사용자 인증을 진행해주세요.
        </ErrorText>
      </Container>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    setSuccess("비밀번호가 성공적으로 변경되었습니다.");
  };

  return (
    <Container>
      <Title>새 비밀번호 설정</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="newPassword">새 비밀번호</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="비밀번호 확인을 입력하세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Btn type="submit">비밀번호 변경</Btn>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
      {success && <ResultText>{success}</ResultText>}
    </Container>
  );
};

export default ChangePW;
