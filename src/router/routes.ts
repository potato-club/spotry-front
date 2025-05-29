
export const ROUTES = {
  SPLASH: "/",
  LOGIN: "/loginPage", 
  SIGNUP: "/signup",
  
  FIND_ID_PW: "/findPage",
  VERIFY_USER: "/verifyUser", 
  FIND_RESULT: "/findResult/:userId",
  RESET_SUCCESS: "/reset-success",
  
  MAIN: "/main",
  LOCATION: "/location",
  SEARCH: "/search",
  WRITE: "/write",
  
  CREW: "/crew",
  POST: "/post", 
  MY_PAGE: "/mypage",
  SEARCH_RESULT: "/result",
  EACH_POST: "/eachPost/:postId",
  
  COMMENTS: "/comments",
} as const;


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


export const DYNAMIC_ROUTE_PATTERNS = [
  "/findResult/",
] as const;


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