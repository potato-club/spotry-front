import MainLocation from "./components/Location/MainLocation";
import {Container } from "./styles/Container";

function App() {
  return (
    <div className="main">
      {/*Container 안에 넣어주세요*/}
      <Container>
        <MainLocation/>
      </Container>
    </div>
  );
}

export default App;

