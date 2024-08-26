import { Btn, Container } from "./styles/Container";
import LoginPage from "./components/Login/LoginPage";

function App() {
  return (
    <div className="main">
      {/*Container 안에 넣어주세요*/}
      <Container>
        <LoginPage />
      </Container>
    </div>
  );
}

export default App;
