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
  width: ${({ theme }) => theme.sizes.component.menuBar.width};
  height: ${({ theme }) => theme.sizes.component.menuBar.height};
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  position: fixed;
  bottom: 0;
  z-index: ${({ theme }) => theme.sizes.zIndex.menuBar};
`;

const BarBtn = styled.div<BarBtnProps>`
  display: flex;
  width: ${({ theme }) => theme.sizes.component.barButton.width};
  height: ${({ theme }) => theme.sizes.component.barButton.height};
  flex-wrap: wrap;
  justify-content: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  background-color: ${({ isActive, theme }) => 
    isActive ? theme.colors.interactive.hover : theme.colors.utility.transparent};
  cursor: pointer;
  transition: background-color 0.2s ease;

  ${({ isActive, theme }) =>
    isActive &&
    `
    div {
      color: ${theme.colors.primary.main};
    }
  `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.interactive.hover};
  }
`;
const IconWrapper = styled.div<{ isActive: boolean }>`
  width: ${({ theme }) => theme.sizes.component.icon.small.width};
  height: ${({ theme }) => theme.sizes.component.icon.small.height};

  svg {
    stroke: ${({ isActive, theme }) => 
      isActive ? theme.colors.primary.main : theme.colors.text.inactive};
    fill: ${({ isActive, theme }) => 
      isActive ? theme.colors.primary.main : 'none'};
    transition: stroke 0.2s ease, fill 0.2s ease;

    #postLine1,
    #postLine2 {
      stroke: ${({ theme }) => theme.colors.text.inactive};
    }

    #circle4 {
      fill: ${({ isActive, theme }) => 
        isActive ? theme.colors.primary.main : theme.colors.text.inactive};
    }

    #circle1,
    #circle3,
    #circle5 {
      fill: ${({ isActive, theme }) => 
        isActive ? theme.colors.background.secondary : theme.colors.text.inactive};
    }
  }
`;

const Name = styled.div<{ isActive: boolean }>`
  flex-wrap: wrap;
  display: flex;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  width: ${({ theme }) => theme.sizes.component.barButton.width};
  height: 12px;
  align-content: center;
  justify-content: center;
  color: ${({ isActive, theme }) => 
    isActive ? theme.colors.primary.main : theme.colors.text.inactive};
  transition: color 0.2s ease;
`;

export default MainBar;
