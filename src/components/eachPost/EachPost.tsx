import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Detail from "./postDetail/Detail";
import Comments from "./postComment/Comments";
import useDragY from "../../hook/useDragY";

const EachPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const id = postId ? parseInt(postId, 10) : null;
  const { divRef, handleMouseDown, handleMouseUp, handleMouseMove } =
    useDragY();

  if (id === null) return <div>잘못된 접근입니다.</div>;

  return (
    <Wrapper
      ref={divRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Detail />

      <Separator />

      <Comments postId={id} />
    </Wrapper>
  );
};

export default EachPost;

const Wrapper = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 58px;
`;

const Separator = styled.div`
  height: 20px;
  width: 100%;
  background-color: #2b2b2b;
`;
