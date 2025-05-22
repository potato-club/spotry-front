import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const IdPwHeader: React.FC<HeaderProps> = ({ title }) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
};

const HeaderWrapper = styled.div`
  background-color: #333333;
  width: 375px;
  height: 56px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  align-content: center;
`;

export default IdPwHeader;
