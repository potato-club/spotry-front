import React, { memo } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface WriteButtonProps {
  className?: string;
}

/**
 * 글쓰기 버튼 컴포넌트 - React.memo로 최적화
 * props가 변경되지 않으면 리렌더링하지 않음
 */
const WriteButton: React.FC<WriteButtonProps> = memo(({ className }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/write");
  };

  return (
    <WriteButtonContainer onClick={handleClick} className={className}>
      <IconImage
        src={`${process.env.PUBLIC_URL}/images/writeBtn.png`}
        alt="write icon"
      />
    </WriteButtonContainer>
  );
});

WriteButton.displayName = 'WriteButton';

const WriteButtonContainer = styled.button`
  position: fixed;
  bottom: ${({ theme }) => `calc(${theme.sizes.component.menuBar.height} + ${theme.sizes.spacing.lg})`};
  right: ${({ theme }) => theme.sizes.spacing.lg};
  width: ${({ theme }) => theme.sizes.component.icon.large.width};
  height: ${({ theme }) => theme.sizes.component.icon.large.height};
  background-color: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.utility.shadow};
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: ${({ theme }) => theme.sizes.zIndex.modal};
  
  /* 375px 컨테이너 내부에 위치하도록 조정 */
  transform: translateX(-${({ theme }) => theme.sizes.spacing.lg});

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transform: translateX(-${({ theme }) => theme.sizes.spacing.lg}) translateY(-2px);
    box-shadow: 0 6px 12px ${({ theme }) => theme.colors.utility.shadow};
  }

  &:active {
    transform: translateX(-${({ theme }) => theme.sizes.spacing.lg}) translateY(0);
    box-shadow: 0 2px 4px ${({ theme }) => theme.colors.utility.shadow};
  }
`;

const IconImage = styled.img`
  width: 65%;
  height: 65%;
  border-radius: 50%;
`;

export default WriteButton;
