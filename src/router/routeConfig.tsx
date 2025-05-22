import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import PrivateRoute from "../layout/PrivateRoute";
import { ROUTES } from "./routes";

// ========================================
// 컴포넌트 Lazy Import (성능 최적화)
// ========================================

// 인증 관련
const SplashMain = lazy(() => import("../SplashPage/splashMain"));
const LoginPage = lazy(() => import("../components/Login/LoginPage"));
const SubmitMain = lazy(() => import("../components/SubmitLogin/SubmitPage"));

// 비밀번호 찾기
const FindIdPwPage = lazy(() => import("../components/FindChangeIdPw/FindIdPwPage"));
const VerifyUser = lazy(() => import("../components/FindChangeIdPw/VerfyUser"));
const FindResult = lazy(() => import("../components/FindChangeIdPw/FindResult"));
const ResetSuccess = lazy(() => import("../components/FindChangeIdPw/ResetSuccess"));

// 메인 기능
const Main = lazy(() => import("../components/MainPage/Main"));
const MainLocation = lazy(() => import("../components/Location/LocationPage/MainLocation"));
const SearchPage = lazy(() => import("../components/Search/SearchPage"));
const WritePost = lazy(() => import("../components/WritingPost/WritePost"));

// 각 페이지
const CrewPage = lazy(() => import("../components/EachPage/crewPage/CrewPage"));
const PostPage = lazy(() => import("../components/EachPage/postPage/PostPage"));
const MyPage = lazy(() => import("../components/EachPage/myPage/MyPage"));
const SearchResult = lazy(() => import("../components/EachPage/searchResult/SearchResult"));
const EachPost = lazy(() => import("../components/eachPost/EachPost"));

// ========================================
// 로딩 컴포넌트
// ========================================
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    color: 'white'
  }}>
    로딩 중...
  </div>
);

// ========================================
// 라우트 설정
// ========================================

/**
 * 애플리케이션 라우트 구성
 */
export const routeConfig: RouteObject[] = [
  // 공개 라우트
  {
    path: ROUTES.SPLASH,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SplashMain />
      </Suspense>
    ),
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.WRITE,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <WritePost />
      </Suspense>
    ),
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <SubmitMain />
      </Suspense>
    ),
  },
  
  // 비밀번호 찾기 관련
  {
    path: ROUTES.FIND_ID_PW,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <FindIdPwPage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.VERIFY_USER,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <VerifyUser />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FIND_RESULT,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <FindResult />
      </Suspense>
    ),
  },
  {
    path: ROUTES.RESET_SUCCESS,
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ResetSuccess />
      </Suspense>
    ),
  },

  // 보호된 라우트 (인증 필요)
  {
    element: <PrivateRoute />,
    children: [
      {
        path: ROUTES.LOCATION,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MainLocation />
          </Suspense>
        ),
      },
      {
        path: ROUTES.MAIN,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Main />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SEARCH,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CREW,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <CrewPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.POST,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PostPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.MY_PAGE,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SEARCH_RESULT,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <SearchResult />
          </Suspense>
        ),
      },
      {
        path: ROUTES.EACH_POST,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <EachPost />
          </Suspense>
        ),
      },
    ],
  },

  // 기본 경로 (404 처리)
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
];