import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100vh;
  width: ${({ theme }) => theme.sizes.container.mobile};
  padding: 0;
`;

export const Btn = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary.main};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  width: ${({ theme }) => theme.sizes.component.button.large.width};
  height: ${({ theme }) => theme.sizes.component.button.large.height};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.utility.black};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: translateY(1px);
  }
`;
