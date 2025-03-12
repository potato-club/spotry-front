import MainLocation from "./container/_Location/LoactionPage/MainLocation";
import SearchPage from "./container/Search/SearchPage";
import Main from "./container/MainPage/Main";
import { Container } from "./styles/Container";
import { Routes, Route, useLocation } from "react-router-dom";
import CrewPage from "./container/EachPage/crewPage/CrewPage";
import PostPage from "./container/EachPage/postPage/PostPage";
import MyPage from "./container/EachPage/myPage/MyPage";
import SearchResult from "./container/EachPage/searchResult/SearchResult";
import MainHeader from "./container/MainPage/header/MainHeader";
import MainBar from "./components/MenuBar/MainBar";
import EachPost from "./components/eachPost/EachPost";
import SubmitMain from "./components/SubmitLogin/SubmitPage";
import LoginPage from "./components/Login/LoginPage";
import WritePost from "./components/WritingPost/WritePost";
import PrivateRoute from "./layout/PrivateRoute";
import useClearToken from "./hook/useClearToken";
import FindID from "./components/FindChangeIdPw/FindID";
import ChangePW from "./components/FindChangeIdPw/ChangePW";
import VerifyUser from "./components/FindChangeIdPw/VerfyUser";
import SplashMain from "./SplashPage/splashMain";

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
          location.pathname !== "/findID" &&
          location.pathname !== "/changePW" &&
          location.pathname !== "/verifyUser" && (
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
          <Route path="/findID" element={<FindID />} />
          <Route path="/changePW" element={<ChangePW />} />
          <Route path="/verifyUser" element={<VerifyUser />} />

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
