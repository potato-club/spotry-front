import MainLocation from "./components/Location/LocationPage/MainLocation";
import SearchPage from "./components/Search/SearchPage";
import Main from "./components/MainPage/Main";
import { Container } from "./styles/Container";
import { Routes, Route, useLocation } from "react-router-dom";
import CrewPage from "./components/EachPage/crewPage/CrewPage";
import PostPage from "./components/EachPage/postPage/PostPage";
import MyPage from "./components/EachPage/myPage/MyPage";
import SearchResult from "./components/EachPage/searchResult/SearchResult";
import MainHeader from "./components/MainPage/header/MainHeader";
import MainBar from "./components/MenuBar/MainBar";
import EachPost from "./components/eachPost/EachPost";
import SubmitMain from "./components/SubmitLogin/SubmitPage";
import LoginPage from "./components/Login/LoginPage";
import WritePost from "./components/WritingPost/WritePost";
import PrivateRoute from "./layout/PrivateRoute";
import useClearToken from "./hook/useClearToken";
import FindIdPwPage from "./components/FindChangeIdPw/FindIdPwPage";
import VerifyUser from "./components/FindChangeIdPw/VerfyUser";
import SplashMain from "./SplashPage/splashMain";
import FindResult from "./components/FindChangeIdPw/FindResult";
import ResetSuccess from "./components/FindChangeIdPw/ResetSuccess";

const AppContent = () => {
  const location = useLocation();

  useClearToken();

  return (
    <div className="main">
      <Container>
        {location.pathname !== "/" &&
          location.pathname !== "/loginPage" &&
          location.pathname !== "/search" &&
          location.pathname !== "/write" &&
          location.pathname !== "/location" &&
          location.pathname !== "/signup" &&
          location.pathname !== "/findPage" &&
          location.pathname !== "/verifyUser" &&
          location.pathname !== "/comments" &&
          !location.pathname.startsWith("/findResult/") && (
            <>
              <MainHeader />
              <MainBar />
            </>
          )}
        <Routes>
          <Route path="/" element={<SplashMain />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/write" element={<WritePost />} />
          <Route path="/signup" element={<SubmitMain />} />
          <Route path="/findPage" element={<FindIdPwPage />} />
          <Route path="/verifyUser" element={<VerifyUser />} />
          <Route path="/findResult/:userId" element={<FindResult />} />
          <Route path="/reset-success" element={<ResetSuccess />} />

          <Route element={<PrivateRoute />}>
            <Route path="/location" element={<MainLocation />} />
            <Route path="/main" element={<Main />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/crew" element={<CrewPage />} />
            <Route path="/post" element={<PostPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/result" element={<SearchResult />} />
            <Route path="/eachPost/:postId" element={<EachPost />} />
          </Route>

          <Route path="*" element={<Main />} />
        </Routes>
      </Container>
    </div>
  );
};

export default AppContent;
//
