// import React, { useState } from "react";
// import {
//   Container,
//   Title,
//   Form,
//   Label,
//   ErrorText,
//   Input,
// } from "../../styles/ShareStyles";
// import { Btn } from "../../styles/Container";
// import { useNavigate } from "react-router-dom";

// // 임시 유저 데이터
// const dummyUsers = [
//   { id: "ssoo3423", name: "이성주", email: "ssoo3432@naver.com" },
//   { id: "choi3432", name: "최동인", email: "choi3432@naver.com" },
// ];

// const VerifyUser: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const user = dummyUsers.find((u) => u.name === name && u.email === email);
//     if (user) {
//       navigate("/changePW", { state: { userId: user.id } });
//     } else {
//       setError("일치하는 회원 정보가 없습니다.");
//       console.log("뭐하냐? ㅋㅋ");
//     }
//   };

//   return (
//     <Container>
//       <Title>비밀번호 재설정을 위해 정보를 입력해주세요.</Title>
//       <Form onSubmit={handleSubmit}>
//         <Label htmlFor="name">이름</Label>
//         <Input
//           id="name"
//           type="text"
//           placeholder="이름을 입력하세요"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />

//         <Label htmlFor="email">이메일</Label>
//         <Input
//           id="email"
//           type="email"
//           placeholder="이메일을 입력하세요"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <Btn type="submit">비밀번호 재설정</Btn>
//       </Form>
//       {error && <ErrorText>{error}</ErrorText>}
//     </Container>
//   );
// };

// export default VerifyUser;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Label,
  ErrorText,
} from "../../styles/ShareStyles";
import { Btn } from "../../styles/Container";
import EmailSelect from "../Login/EmailSelect";
import { EmailInput } from "../../styles/ShareStyles";
import {
  verifyUserInfo,
  sendVerificationEmail,
  verifyEmailCode,
} from "../../api/verifyUserApi";
import url from "../../api/url";

const VerifyUser: React.FC = () => {
  const navigate = useNavigate();

  // 1) 사용자 입력
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

  // 2) 인증 흐름 상태
  const [step, setStep] = useState<"info" | "code">("info");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [userPk, setUserPk] = useState<number | null>(null);

  const fullEmail = `${emailLocal}@${emailDomain}`;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await verifyUserInfo(userId, name, fullEmail);

      console.log("[사용자 확인 응답]", res.data);

      setUserPk(res.data as number);

      console.log("[코드 전송 요청]", fullEmail);

      await sendVerificationEmail(fullEmail);

      //console.log("[코드 전송 응답]", res.data);

      setStep("code");
    } catch (err: any) {
      console.error("[❌ 이메일 전송 오류]", err.response?.data);
      setError(
        err.response?.data?.message ||
          "사용자 확인 또는 메일 발송 중 오류가 발생했습니다."
      );
    }
    console.log(
      "[DEBUG] POST →",
      url.defaults.baseURL + "/auth/password/verify",
      { userId, nickName: name, userEmail: fullEmail }
    );
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await verifyEmailCode(fullEmail, code);

      navigate("/changePW", { state: { id: userPk } });
    } catch (err: any) {
      setError(err.response?.data?.message || "인증 코드가 올바르지 않습니다.");
    }
  };

  return (
    <Container>
      <Title>비밀번호 재설정을 위해 정보 입력</Title>
      <Form onSubmit={step === "info" ? handleSendCode : handleVerifyCode}>
        {step === "info" && (
          <>
            <Label htmlFor="name">이름</Label>
            <EmailInput
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />

            <Label htmlFor="userId">아이디</Label>
            <EmailInput
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />

            <Label htmlFor="emailLocal">이메일</Label>
            <div style={{ display: "flex", gap: 8 }}>
              <EmailInput
                id="emailLocal"
                value={emailLocal}
                onChange={(e) => setEmailLocal(e.target.value)}
                placeholder="local-part"
                required
              />
              <span>@</span>
              <EmailSelect
                name="emailDomain"
                value={emailDomain}
                onChange={(e) => setEmailDomain(e.target.value)}
              />
            </div>
          </>
        )}

        {step === "code" && (
          <>
            <Label htmlFor="code">인증 코드</Label>
            <EmailInput
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="메일로 받은 코드를 입력하세요"
              required
            />
          </>
        )}

        <Btn type="submit">
          {step === "info" ? "정보 확인 & 코드 전송" : "코드 검증"}
        </Btn>
      </Form>

      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export default VerifyUser;
