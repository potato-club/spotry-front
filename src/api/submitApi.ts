import url from "./url";

export interface SignupForm {
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  emailDomain: string;
  id: string;
  password: string;
  confirmPassword: string;
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
  try {
    await url.post("/signup", formData);
  } catch (error) {
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};
