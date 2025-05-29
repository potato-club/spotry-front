import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Detail from "./postDetail/Detail";
import Comments from "./postComment/Comments";

const EachPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const id = postId ? parseInt(postId, 10) : null;

  if (id === null) {
    return <div>잘못된 접근입니다.</div>;
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <Detail />

        <Separator />

        <Comments />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default EachPost;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.container.mobile};
  margin: 0 auto;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  padding-top: ${({ theme }) => theme.sizes.spacing.xxxl};
  padding-bottom: ${({ theme }) => `calc(${theme.sizes.component.menuBar.height} + ${theme.sizes.spacing.xl})`};
  box-sizing: border-box;
`;

const Separator = styled.div`
  height: ${({ theme }) => theme.sizes.spacing.xl};
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  margin: ${({ theme }) => theme.sizes.spacing.lg} 0;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
`;
