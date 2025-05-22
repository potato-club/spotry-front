// ========================================
// 라우팅 관련 타입 정의
// ========================================

import { ROUTES } from './routes';

/**
 * 라우트 경로 타입 (문자열 리터럴 유니온)
 */
export type RoutePathType = typeof ROUTES[keyof typeof ROUTES];

/**
 * 동적 매개변수가 있는 라우트 매개변수 타입
 */
export interface RouteParams {
  postId?: string;
  userId?: string;
}

/**
 * 네비게이션 옵션
 */
export interface NavigationOptions {
  replace?: boolean;
  state?: any;
}

/**
 * 라우트 메타데이터
 */
export interface RouteMetadata {
  title?: string;
  requiresAuth: boolean;
  showLayout: boolean;
  description?: string;
}