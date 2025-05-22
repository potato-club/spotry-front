import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import PrivateRoute from "../layout/PrivateRoute";
import { ROUTES } from "./routes";


const SplashMain = lazy(() => import("../SplashPage/splashMain"));
const LoginPage = lazy(() => import("../components/Login/LoginPage"));
const SubmitMain = lazy(() => import("../components/SubmitLogin/SubmitPage"));

const FindIdPwPage = lazy(() => import("../components/FindChangeIdPw/FindIdPwPage"));
const VerifyUser = lazy(() => import("../components/FindChangeIdPw/VerfyUser"));
const FindResult = lazy(() => import("../components/FindChangeIdPw/FindResult"));
const ResetSuccess = lazy(() => import("../components/FindChangeIdPw/ResetSuccess"));

const Main = lazy(() => import("../components/MainPage/Main"));
const MainLocation = lazy(() => import("../components/Location/LocationPage/MainLocation"));
const SearchPage = lazy(() => import("../components/Search/SearchPage"));
const WritePost = lazy(() => import("../components/WritingPost/WritePost"));

const CrewPage = lazy(() => import("../components/EachPage/crewPage/CrewPage"));
const PostPage = lazy(() => import("../components/EachPage/postPage/PostPage"));
const MyPage = lazy(() => import("../components/EachPage/myPage/MyPage"));
const SearchResult = lazy(() => import("../components/EachPage/searchResult/SearchResult"));
const EachPost = lazy(() => import("../components/eachPost/EachPost"));


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


export const routeConfig: RouteObject[] = [
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

  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
];