// ========================================
// 라우팅 경로 상수 정의
// ========================================

/**
 * 애플리케이션 라우팅 경로
 */
export const ROUTES = {
  // 인증 관련
  SPLASH: "/",
  LOGIN: "/loginPage", 
  SIGNUP: "/signup",
  
  // 비밀번호 찾기 관련
  FIND_ID_PW: "/findPage",
  VERIFY_USER: "/verifyUser", 
  FIND_RESULT: "/findResult/:userId",
  RESET_SUCCESS: "/reset-success",
  
  // 메인 기능
  MAIN: "/main",
  LOCATION: "/location",
  SEARCH: "/search",
  WRITE: "/write",
  
  // 각 페이지
  CREW: "/crew",
  POST: "/post", 
  MY_PAGE: "/mypage",
  SEARCH_RESULT: "/result",
  EACH_POST: "/eachPost/:postId",
  
  // 기타
  COMMENTS: "/comments",
} as const;

/**
 * 헤더/메뉴바를 숨겨야 하는 페이지들
 * (전체 화면을 사용하는 페이지들)
 */
export const LAYOUT_HIDDEN_PATHS = [
  ROUTES.SPLASH,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FIND_ID_PW,
  ROUTES.VERIFY_USER,
  ROUTES.SEARCH,
  ROUTES.WRITE,
  ROUTES.LOCATION,
  ROUTES.COMMENTS,
] as const;

/**
 * 동적 경로 패턴 (매개변수가 있는 경로)
 */
export const DYNAMIC_ROUTE_PATTERNS = [
  "/findResult/",
] as const;

/**
 * 인증이 필요한 경로들 (PrivateRoute로 보호되는 경로)
 */
export const PROTECTED_ROUTES = [
  ROUTES.LOCATION,
  ROUTES.MAIN,
  ROUTES.SEARCH,
  ROUTES.CREW,
  ROUTES.POST,
  ROUTES.MY_PAGE,
  ROUTES.SEARCH_RESULT,
  ROUTES.EACH_POST,
] as const;

/**
 * 공개 경로들 (인증 없이 접근 가능)
 */
export const PUBLIC_ROUTES = [
  ROUTES.SPLASH,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FIND_ID_PW,
  ROUTES.VERIFY_USER,
  ROUTES.FIND_RESULT,
  ROUTES.RESET_SUCCESS,
  ROUTES.WRITE,
] as const;