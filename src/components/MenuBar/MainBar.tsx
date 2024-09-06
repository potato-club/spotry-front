import styled from "styled-components";
import { BarList } from "../Data/BarSvg";

const MainBar = () => {
  return (
    <MenuItems>
      {BarList.map(({ name, icon }) => (
        <Item>
          <IconWrapper>{icon()}</IconWrapper>
          <Name>{name}</Name>
        </Item>
      ))}
    </MenuItems>
  );
};

const MenuItems = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  flex-direction: column;
  flex-wrap: wrap;
`;
const Item = styled.div``;
const IconWrapper = styled.div``;
const Name = styled.span``;

export default MainBar;
