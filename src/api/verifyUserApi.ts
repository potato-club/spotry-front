import url from "./url";

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


export const sendVerificationEmail = (email: string) =>
  url.post("/auth/register/send-email", { email });


export const verifyEmailCode = (email: string, code: string) =>
  url.post("/auth/register/verify-code", { email, code });


export const resetPassword = (id: number, newPassword: string) => {
  return url.post("/auth/password/reset", {
    id,
    newPassword,
  });
};
