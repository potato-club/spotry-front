import { Container } from "./styles/Container";
import LoginPage from "./components/Login/LoginPage";
import MainBar from "./components/MenuBar/MainBar";

function App() {
  return (
    <div className="main">
      {/* Container 안에 넣어주세요
      <Container>
        <LoginPage />
      </Container> */}
      <MainBar></MainBar>
    </div>
  );
}

export default App;
