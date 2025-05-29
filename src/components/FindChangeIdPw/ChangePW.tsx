import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Label,
  Input,
  ErrorText,
} from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";
import { resetPassword } from "../../api/userApi";

interface LocationState {
  id?: number;
}

const ChangePW: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = (state as LocationState) || {};

  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");

  if (!id) {
    return (
      <Container>
        <ErrorText>잘못된 접근입니다. 인증을 먼저 진행해주세요.</ErrorText>
        <Btn onClick={() => navigate("/verify-user")}>인증 페이지로 이동</Btn>
      </Container>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPw !== confirmPw) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await resetPassword(id, newPw);
      navigate("/reset-success");
    } catch (err: any) {
      setError(err.response?.data?.message || "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Title>새 비밀번호 설정</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="newPw">새 비밀번호</Label>
        <Input
          id="newPw"
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
          required
        />

        <Label htmlFor="confirmPw">비밀번호 확인</Label>
        <Input
          id="confirmPw"
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
          required
        />

        <Btn type="submit">비밀번호 변경</Btn>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default ChangePW;
