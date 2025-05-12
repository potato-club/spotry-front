import React from "react";
import styled from "styled-components";

interface TabButtonsProps {
  selected: string;
  onSelect: (value: string) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ selected, onSelect }) => {
  return (
    <TabWrapper>
      <TabButton selected={selected === "id"} onClick={() => onSelect("id")}>
        아이디
      </TabButton>
      <TabButton
        selected={selected === "password"}
        onClick={() => onSelect("password")}
      >
        비밀번호
      </TabButton>
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;
  border-bottom: 1px solid #3b3b3b;
  width: 373px;
  height: 39px;
`;

interface TabButtonProps {
  selected: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px;
  background-color: transparent;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#8d8d8d")};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  border-bottom: ${(props) =>
    props.selected ? "3px solid #C1F84D" : "3px solid transparent"};

  &:hover {
    background-color: #3b3b3b;
  }
  align-self: center;
`;

export default TabButtons;
