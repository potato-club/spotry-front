import MainLocation from "./container/Location/MainLocation";
import SearchPage from "./container/Search/SearchPage";
import Main from "./container/MainPage/Main";
import { Container } from "./styles/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EachPage from "./container/MainPage/eachPage/EachPage";

function App() {
  return (
    <Router>
      <div className="main">
        <Container>
          <Routes>
            <Route path="/" element={<MainLocation />} />
            <Route path="/main" element={<Main />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/each" element={<EachPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
