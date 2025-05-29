
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasNext: boolean;
}


export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    nickName: string;
    email: string;
  };
}


export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
}