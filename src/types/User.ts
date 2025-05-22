
export interface User {
  id: string;
  nickName: string;
  profileImage?: string;
  region: string;
}


export interface UserProfile {
  id: string;
  birthday: string;
  profileUrl: string;
  gender: string;
  nickName: string;
  email: string;
}


export interface LoginFormData {
  userId: string;
  userPw: string;
}


export interface SignupFormData {
  userName: string;
  nickName: string;
  gender: "MALE" | "FEMALE";
  email: string;
  birthDay: string;
  userId: string;
  userPw: string;
}


export interface UseInputFieldResult {
  value: string;
  setValue: (value: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
}