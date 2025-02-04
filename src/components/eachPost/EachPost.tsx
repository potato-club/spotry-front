import styled from "styled-components";
import Detail from "./postDetail/Detail";
// import ShowComment from "./postComment/ShowComment";

const EachPost = () => {
  return (
    <Wrapper>
      <Detail />
      <Separater />
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
