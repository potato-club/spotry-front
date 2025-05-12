import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SplashMain: React.FC = () => {
  const navigte = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigte("/loginPage", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigte]);

  return (
    <SplashWrapper>
      <ImageContainer>
        <SplashImage
          src={process.env.PUBLIC_URL + "/images/Vector.png"}
          alt="Splash 1"
          width="81.01px"
          height="85px"
        />
        <SplashImage
          src={process.env.PUBLIC_URL + "/images/Group.png"}
          alt="Splash 2"
          width="144.61px"
          height="30.15px"
        />
      </ImageContainer>
    </SplashWrapper>
  );
};

const SplashWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2b2b2b;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  align-items: center;
`;

const SplashImage = styled.img`
  object-fit: contain;
`;

export default SplashMain;
