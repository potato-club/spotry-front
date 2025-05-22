import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Label,
  ErrorText,
  Input,
} from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";
import { findUserId } from "../../api/userApi";
import EmailSelect from "../Login/EmailSelect";
import { EmailInput } from "../../styles/ShareStyles";

const FindID: React.FC = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const userEmailFull = `${userEmail}@${emailDomain}`;

    try {
      const response = await findUserId(nickName, userEmailFull);

      if (response) {
        console.log("아이디 찾기 성공:", response);
        navigate(`/findResult/${response}`);
      } else {
        setError("아이디를 찾을 수 없습니다.");
      }
    } catch (err: any) {
      setError("아이디를 찾을 수 없습니다.");
    }
  };

  return (
    <Container>
      <Title>아이디 찾기</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">이름</Label>
        <Input
          id="nickName"
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
          placeholder="이름을 입력하세요"
          required
        />
        <Label htmlFor="userEmail">이메일</Label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <EmailInput
            id="userEmail"
            type="text"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="이메일"
            required
          />
          <span>@</span>
          <EmailSelect
            name="emailDomain"
            value={emailDomain}
            onChange={(e) => setEmailDomain(e.target.value)}
          />
        </div>
        <Btn type="submit">아이디 찾기</Btn>
      </Form>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default FindID;
