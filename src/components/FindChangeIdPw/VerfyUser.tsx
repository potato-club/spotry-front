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
} from "../../api/userApi";
import url from "../../api/url";

const VerifyUser: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [emailDomain, setEmailDomain] = useState("");

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
