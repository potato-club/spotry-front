import url from "./url";

/**
 * 1) 아이디·닉네임·이메일 확인
 */
export const verifyUserInfo = (
  userId: string,
  nickName: string,
  userEmail: string
) =>
  url.post("/auth/password/verify", {
    userId,
    nickName,
    userEmail,
  });

/**
 * 2) 코드 발송
 */
export const sendVerificationEmail = (email: string) =>
  url.post("/auth/register/send-email", { email });

/**
 * 3) 코드 검증
 */
export const verifyEmailCode = (email: string, code: string) =>
  url.post("/auth/register/verify-code", { email, code });

/**
 * 4) 비밀번호 변경
 */
export const resetPassword = (id: number, newPassword: string) => {
  return url.post("/auth/password/reset", {
    id,
    newPassword,
  });
};
