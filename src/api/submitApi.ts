import url from "./url";

export interface SignupForm {
  userName: string,
  nickName: string,
  email: string,
  birthDay: string,
  userId: string,
  userPw: string
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

  console.log(formData);
  try {
    const response = await url.post("/auth/register", formData, {
      headers: {
        "Content-Type" : "application/json",
      },
    });

    alert("회원가입 성공!");

    console.log(response);
    const token = response.headers['authorization'] || response.headers['Authorization']
    if (token) {
      localStorage.setItem("accessToken", token);
      alert("회원가입 성공! 토큰이 저장되었습니다.");
    } else {
      alert("회원가입 성공! 그러나 토큰을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    throw new Error("회원가입 중 오류가 발생했습니다.");
  }
};
