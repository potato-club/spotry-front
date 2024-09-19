import MainLocation from "./container/Location/MainLocation";
import Main from "./container/MainPage/Main";
import { Container } from "./styles/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <Container>
          <Routes>
            <Route path="/" element={<MainLocation/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
