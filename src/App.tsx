import MainLocation from "./container/Location/MainLocation";
import SearchPage from "./container/Search/SearchPage";
import Main from "./container/MainPage/Main";
import { Container } from "./styles/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EachPage from "./container/EachPage/EachPage";
import CrewPage from "./container/EachPage/crewPage/CrewPage";
import PostPage from "./container/EachPage/postPage/PostPage";
import MyPage from "./container/EachPage/myPage/MyPage";
import SearchResult from "./container/EachPage/searchResult/SearchResult";
import MainHeader from "./container/MainPage/header/MainHeader";

function App() {
  return (
    <Router>
      <div className="main">
        <Container>
          {/* <MainHeader/> */}
          <Routes>
            <Route path="/" element={<MainLocation/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/search" element={<SearchPage/>}/>
            <Route path="/each" element={<EachPage/>}/>
            <Route path="/crew" element={<CrewPage/>}/>
            <Route path="/post" element={<PostPage/>}/>
            <Route path="/mypage" element={<MyPage/>}/>
            <Route path="/result" element={<SearchResult/>}/>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
