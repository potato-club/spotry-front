import styled from "styled-components";
import { BarList } from "../Data/BarSvg";

const MainBar = () => {
  return (
    <MenuBar>
      {BarList.map(({ name, icon }) => (
        <BarBtn>
          <IconWrapper>{icon()}</IconWrapper>
          <Name>{name}</Name>
        </BarBtn>
      ))}
    </MenuBar>
  );
};

const MenuBar = styled.div`
  display: flex;
  width: 357px;
  height: 58px;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  background-color: #333333;
`;

const BarBtn = styled.div`
  display: flex;
  width: 75px;
  height: 40px;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background-color: #373934;
    cursor: pointer;
    svg {
      stroke: #c1f84d;
      fill: #c1f84d;
    }

    svg #postLine1,
    svg #postLine2 {
      stroke: #666666;
    }

    svg #circle4 {
      fill: #c1f84d;
    }
    svg #circle1,
    svg #circle3,
    svg #circle5 {
      fill: #333333;
    }

    div {
      color: #c1f84d;
    }
  }
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;

  svg {
    stroke: #666666;
    fill: none;
  }

  svg #circle4 {
    fill: #666666;
  }
`;

const Name = styled.div`
  flex-wrap: wrap;
  display: flex;
  font-size: 10px;
  width: 75px;
  height: 12px;
  align-content: center;
  justify-content: center;
  color: #666666;
`;

export default MainBar;
