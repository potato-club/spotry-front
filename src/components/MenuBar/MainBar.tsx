import styled from "styled-components";
import { BarList } from "../Data/BarSvg";
import useBarActive from "../../hook/useBarActive";

interface BarBtnProps {
  isActive: boolean;
}

const MainBar = () => {
  const { barActive, handlePageClick } = useBarActive();

  const pagePaths: any = {
    홈: "/main",
    게시글: "/post",
    크루: "/crew",
    마이페이지: "/mypage",
  };

  return (
    <MenuBar>
      {BarList.map(({ name, icon }) => (
        <BarBtn
          key={name}
          isActive={barActive === pagePaths[name]}
          onClick={() => handlePageClick(pagePaths[name])}
        >
          <IconWrapper isActive={barActive === pagePaths[name]}>
            {icon()}
          </IconWrapper>
          <Name isActive={barActive === pagePaths[name]}>{name}</Name>
        </BarBtn>
      ))}
    </MenuBar>
  );
};

const MenuBar = styled.div`
  display: flex;
  width: 375px;
  height: 58px;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  background-color: #333333;
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;

const BarBtn = styled.div<BarBtnProps>`
  display: flex;
  width: 75px;
  height: 40px;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 4px;

  background-color: ${({ isActive }) => (isActive ? "#373934" : "transparent")};

  ${({ isActive }) =>
    isActive &&
    `
  

  div {
    color: #c1f84d;
  }
`}
`;
const IconWrapper = styled.div<{ isActive: boolean }>`
  width: 28px;
  height: 28px;

  svg {
    stroke: ${({ isActive }) => (isActive ? "#c1f84d" : "#666666")};
    fill: ${({ isActive }) => (isActive ? "#c1f84d" : "none")};

    #postLine1,
    #postLine2 {
      stroke: ${({ isActive }) => (isActive ? "#666666" : "#666666")};
    }

    #circle4 {
      fill: ${({ isActive }) => (isActive ? "#c1f84d" : "#666666")};
    }

    #circle1,
    #circle3,
    #circle5 {
      fill: ${({ isActive }) => (isActive ? "#333333" : "#666666")};
    }
  }
`;

const Name = styled.div<{ isActive: boolean }>`
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
