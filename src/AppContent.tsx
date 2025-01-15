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
import WritePost from "./components/WritingPost/WritePost";
import SplashMain from "./SplashPage/splashMain";
import LoginPage from "./components/Login/LoginPage";
import Comments from "./components/eachPost/postComment/Comments";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="main">
      <Container>
        <Routes></Routes>
        {location.pathname !== "/" &&
          location.pathname !== "/search" &&
          location.pathname !== "/splash" &&
          location.pathname !== "/submit" &&
          location.pathname !== "/login" &&
          location.pathname !== "/comments" && (
            <>
              <MainHeader />
              <MainBar />
            </>
          )}
        <Routes>
          <Route path="/" element={<MainLocation />} />
          <Route path="/main" element={<Main />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/result" element={<SearchResult />} />
          <Route path="/eachPost/:postId" element={<EachPost />} />

          <Route path="/write" element={<WritePost />} />
          <Route path="/splash" element={<SplashMain />} />
          <Route path="/submit" element={<SubmitMain />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </Container>
    </div>
  );
};

export default AppContent;
