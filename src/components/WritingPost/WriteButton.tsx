import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WriteButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/write");
  };

  return (
    <WriteButtonContainer onClick={handleClick}>
      <IconImage
        src={`${process.env.PUBLIC_URL}/images/writeBtn.png`}
        alt="write icon"
      />
    </WriteButtonContainer>
  );
};

const WriteButtonContainer = styled.button`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #c6ff00;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 50%;
`;

export default WriteButton;
