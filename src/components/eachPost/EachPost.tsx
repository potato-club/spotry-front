import styled from "styled-components";
import Detail from "./postDetail/Detail";
import Comments from "./postComment/Comments";
import useDragY from "../../hook/useDragY";
// import ShowComment from "./postComment/ShowComment";

const EachPost = () => {
  
  const { divRef, handleMouseDown, handleMouseUp, handleMouseMove } = useDragY();

  return (
    <Wrapper
        ref={divRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}>
      <Detail />
      <Separater />
      <Comments/>
      {/* <ShowComment /> */}
    </Wrapper>
  );
};

export default EachPost;

const Wrapper = styled.div`
padding-top: 40px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
padding-bottom: 58px;
overflow-y: hidden;
`


const Separater = styled.div`
  height: 20px;
  width: 100%;
  background-color: #2b2b2b;
`;
