import React, { useState } from "react";
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
import { findUserID } from "../../api/fidIDapi";

// // 임시 유저 데이터
// const dummyUsers = [
//   { id: "ssoo3423", name: "이성주", email: "ssoo3432@naver.com" },
//   { id: "abcdefg", name: "최동인", email: "choi@naver.com" },
// ];

// // 아이디 마스킹 함수
// function maskID(id: string) {
//   if (id.length < 3) return id;
//   const firstChar = id[0];
//   const lastChar = id[id.length - 1];
//   const middle = id.slice(1, -1).replace(/./g, "*");
//   return `${firstChar}${middle}${lastChar}`;
// }

const FindID: React.FC = () => {
  const [nickName, setNickName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [foundID, setFoundID] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFoundID("");

    try {
      const response = await findUserID(nickName, userEmail); // ✅ API 호출
      if (response.userId) {
        setFoundID(response.userId); // 받은 아이디 저장
      } else {
        setError("아이디를 찾을 수 없습니다.");
      }
    } catch (err) {
      setError(err as string);
    }
  };

  //   // 임시 데이터에서 검색
  //   const user = dummyUsers.find((u) => u.name === name && u.email === email);

  //   if (user) {
  //     // 아이디 마스킹
  //     setFoundID(maskID(user.id));
  //   } else {
  //     setError("일치하는 회원정보가 없습니다.");
  //   }
  // };

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
        <Input
          id="userEmail"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
          required
        />
        <Btn type="submit">아이디 찾기</Btn>
      </Form>
      {foundID && (
        <ResultText>
          회원님의 아이디는 <strong>{foundID}</strong> 입니다.
        </ResultText>
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default FindID;
