import styled from "styled-components";

export const EachWrapper = styled.div`
  padding-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: hidden;
  padding-bottom: ${({ theme }) => theme.sizes.component.menuBar.height};
`;


