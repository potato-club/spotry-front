import MainLocation from "./container/Location/MainLocation";
import SearchPage from "./container/Search/SearchPage";
import Main from "./container/MainPage/Main";
import { Container } from "./styles/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EachPage from "./container/MainPage/eachPage/EachPage";
import LoginPage from "./components/Login/LoginPage";
import MainBar from "./components/MenuBar/MainBar";
import SubmitMain from "./components/SubmitLogin/SubmitPage";
import WritePost from "./components/WritingPost/WritePost";
import WrittenBtn from "./container/MainPage/mainDocument/WrittenBtn";
import WriteButton from "./components/WritingPost/WriteButton";

function App() {
  return (
    <Router>
      <div className="main">
        <Container>
          <Routes>
            {/* <Route path="/" element={<MainLocation />} />
            <Route path="/main" element={<Main />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/each" element={<EachPage />} /> */}
            <Route path="/submit" element={<SubmitMain />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/writebtn" element={<WriteButton />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
