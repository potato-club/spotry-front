import { LAYOUT_HIDDEN_PATHS, DYNAMIC_ROUTE_PATTERNS } from './routes';

/**
 * 현재 경로에서 헤더와 메뉴바를 표시할지 결정하는 함수
 * @param pathname - 현재 경로
 * @returns true면 헤더/메뉴바 표시, false면 숨김
 */
export const shouldShowLayout = (pathname: string): boolean => {
  // 정적 경로 확인
  if (LAYOUT_HIDDEN_PATHS.includes(pathname as any)) {
    return false;
  }
  
  // 동적 경로 패턴 확인 (매개변수가 있는 경로)
  for (const pattern of DYNAMIC_ROUTE_PATTERNS) {
    if (pathname.startsWith(pattern)) {
      return false;
    }
  }
  
  // 기본적으로 레이아웃 표시
  return true;
};

/**
 * 경로 유틸리티 함수들
 */
export const routeUtils = {
  /**
   * 동적 경로에 매개변수 삽입
   */
  fillParams: (route: string, params: Record<string, string | number>): string => {
    let filledRoute = route;
    Object.entries(params).forEach(([key, value]) => {
      filledRoute = filledRoute.replace(`:${key}`, String(value));
    });
    return filledRoute;
  },

  /**
   * 현재 경로가 특정 경로와 일치하는지 확인 (동적 매개변수 고려)
   */
  matchesRoute: (currentPath: string, routePattern: string): boolean => {
    const currentSegments = currentPath.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    
    if (currentSegments.length !== patternSegments.length) {
      return false;
    }
    
    return patternSegments.every((segment, index) => {
      if (segment.startsWith(':')) {
        return true; // 매개변수는 항상 매치
      }
      return segment === currentSegments[index];
    });
  },

  /**
   * 경로에서 매개변수 추출
   */
  extractParams: (currentPath: string, routePattern: string): Record<string, string> => {
    const currentSegments = currentPath.split('/').filter(Boolean);
    const patternSegments = routePattern.split('/').filter(Boolean);
    const params: Record<string, string> = {};
    
    patternSegments.forEach((segment, index) => {
      if (segment.startsWith(':')) {
        const paramName = segment.slice(1);
        params[paramName] = currentSegments[index];
      }
    });
    
    return params;
  },
};