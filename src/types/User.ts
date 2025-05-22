// ========================================
// 사용자 관련 타입 정의
// ========================================

/**
 * 기본 사용자 정보
 */
export interface User {
  id: string;
  nickName: string;
  profileImage?: string;
  region: string;
}

/**
 * 마이페이지 사용자 정보
 */
export interface UserProfile {
  id: string;
  birthday: string;
  profileUrl: string;
  gender: string;
  nickName: string;
  email: string;
}

/**
 * 로그인 폼 데이터 (기존 Login.ts와 통합)
 */
export interface LoginFormData {
  userId: string;
  userPw: string;
}

/**
 * 회원가입 폼 데이터
 */
export interface SignupFormData {
  userName: string;
  nickName: string;
  gender: "MALE" | "FEMALE";
  email: string;
  birthDay: string;
  userId: string;
  userPw: string;
}

/**
 * 입력 필드 훅 결과 타입
 */
export interface UseInputFieldResult {
  value: string;
  setValue: (value: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  placeholder: string;
}