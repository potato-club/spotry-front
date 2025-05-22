import { getToken, setToken } from "../util/storage";
import url from "./url";

export interface SignupForm {
  userName: string;
  nickName: string;
  gender: string;
  email: string;
  birthDay: string;
  userId: string;
  userPw: string;
}

export const checkEmail = async (email: string): Promise<boolean> => {
  try {
    const response = await url.post("/check-email", { email });
    return response.data.exists;
  } catch (error) {
    throw new Error("이메일 확인 중 오류가 발생했습니다.");
  }
};

export const checkId = async (id: string): Promise<boolean> => {
  try {
    const response = await url.post("/check-id", { id });
    return response.data.exists;
  } catch (error) {
    throw new Error("아이디 확인 중 오류가 발생했습니다.");
  }
};

export const submitSignup = async (formData: SignupForm): Promise<void> => {
  console.log("회원가입 요청 데이터:", formData);
  try {
    const response = await url.post("/auth/register", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    alert("회원가입 성공!");
  } catch (error) {
    console.error("회원가입 중 오류:", error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};

export const SubmitLogin = async (loginData: {
  userId: string;
  userPw: string;
}) => {
  try {
    const response = await url.post("/auth/login", loginData);

    if (response.status === 200) {
      const token = response.headers.authorization;
      if (token) {
        setToken(token);
        alert("로그인 성공");
      } else {
        alert("토큰 에러");
      }
    }
    return response;
  } catch (error) {
    alert("로그인 실패");
  }
};