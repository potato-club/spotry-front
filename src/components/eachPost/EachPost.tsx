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
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px;
  box-sizing: border-box;
`;

const Separator = styled.div`
  height: 20px;
  width: 100%;
  background-color: #2b2b2b;
`;
