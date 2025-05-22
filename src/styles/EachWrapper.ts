import styled from "styled-components";

export const EachWrapper = styled.div`
  padding-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.component.menuBar.height} + ${theme.sizes.spacing.xxxl})`};
  box-sizing: border-box;
`;


