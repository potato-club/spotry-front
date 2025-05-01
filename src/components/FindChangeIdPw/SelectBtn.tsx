import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #2e2e2e;
  border-bottom: 1px solid #3b3b3b;
`;

interface TabButtonProps {
  selected: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px;
  background-color: transparent;
  color: ${(props) => (props.selected ? "#76ff03" : "#8d8d8d")};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${(props) =>
    props.selected ? "3px solid #76ff03" : "3px solid transparent"};

  &:hover {
    background-color: #3b3b3b;
  }
`;

interface TabButtonsProps {
  selected: string;
  onSelect: (value: string) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ selected, onSelect }) => {
  return (
    <TabWrapper>
      <TabButton selected={selected === "id"} onClick={() => onSelect("id")}>
        아이디 찾기
      </TabButton>
      <TabButton
        selected={selected === "password"}
        onClick={() => onSelect("password")}
      >
        비밀번호 찾기
      </TabButton>
    </TabWrapper>
  );
};

export default TabButtons;
