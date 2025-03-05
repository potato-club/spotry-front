import React, { useState } from "react";
import {
  Container,
  Title,
  Form,
  Label,
  ErrorText,
  Input,
} from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";
import { useNavigate } from "react-router-dom";

// 임시 유저 데이터
const dummyUsers = [
  { id: "ssoo3423", name: "이성주", email: "ssoo3432@naver.com" },
  { id: "choi3432", name: "최동인", email: "choi3432@naver.com" },
];

const VerifyUser: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = dummyUsers.find((u) => u.name === name && u.email === email);
    if (user) {
      navigate("/reset-password", { state: { userId: user.id } });
    } else {
      setError("일치하는 회원 정보가 없습니다.");
    }
  };

  return (
    <Container>
      <Title>비밀번호 재설정을 위해 정보를 입력해주세요.</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Btn type="submit">비밀번호 재설정</Btn>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default VerifyUser;
