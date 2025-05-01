import React from "react";
import styled from "styled-components";

interface HeaderProps {
  title: string;
}

const IdPwHeader: React.FC<HeaderProps> = ({ title }) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
};

const HeaderWrapper = styled.div`
  background-color: #444444;
  width: 373px;
  height: 40px;
  text-align: center;
  font-size: 16px;
`;

export default IdPwHeader;
