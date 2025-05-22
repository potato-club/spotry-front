// ========================================
// API 응답 관련 타입 정의
// ========================================

/**
 * 기본 API 응답 구조
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * 페이지네이션 응답
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

/**
 * 로그인 응답
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    nickName: string;
    email: string;
  };
}

/**
 * 에러 응답
 */
export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}