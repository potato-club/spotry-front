import { Container } from "./styles/Container";
import { useRoutes, useLocation } from "react-router-dom";
import MainHeader from "./components/MainPage/header/MainHeader";
import MainBar from "./components/MenuBar/MainBar";
import useClearToken from "./hook/useClearToken";
import { shouldShowLayout, routeConfig } from "./router";

const AppContent = () => {
  const location = useLocation();
  const routing = useRoutes(routeConfig);

  useClearToken();

  return (
    <div className="main">
      <Container>
        {shouldShowLayout(location.pathname) && (
          <>
            <MainHeader />
            <MainBar />
          </>
        )}
        {routing}
      </Container>
    </div>
  );
};

export default AppContent;
