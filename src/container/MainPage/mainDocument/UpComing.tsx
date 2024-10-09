import React, { useState } from "react";
import styled from "styled-components";
import { PopularData } from "../../../tableData/PopularData";
import useDargX from "../../../hook/useDargX";

const UpComing = () => {

    const [upComingPost, setUpComingPost] = useState(PopularData);
    const { DivRef, handleMouseDown, handleMouseUp, handleMouseMove } = useDargX();

    return (
    <Wrapper>
        <TitleDiv>
        <UpComingTitle>
            <strong>모집 임박글</strong>
        </UpComingTitle>
        <MoreBtn>더보기</MoreBtn>
        </TitleDiv>
        <UpComingPostDiv
        ref={DivRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        >
        {upComingPost.map((post) => (
            <UpcomingPost key={post.id}>
                <CategoryDiv>
                    <Category>{post.category}</Category>
                </CategoryDiv>
                <div>
                    <Titlediv>{post.title}</Titlediv>
                    <InfoDiv>
                        <img src="/images/thumb_up.png" alt="북바크" />
                        <span>{post.likes}</span>
                    </InfoDiv>
                </div>
            </UpcomingPost>
        ))}
        </UpComingPostDiv>
    </Wrapper>
    );
};

export default UpComing;

const Wrapper = styled.div`
width: 90%;
margin-top: 10px;
`;

const UpComingTitle = styled.p`
color: white;
`;

const MoreBtn = styled.div`
color: #afafaf;
font-size: 14px;
cursor: pointer;
`;

const TitleDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

const UpComingPostDiv = styled.div`
display: flex;
flex-direction: row;
overflow: hidden;
`;

const UpcomingPost = styled.div`
width: 140px;
height: 170px;
background-color: #444444;
border-radius: 12px;
margin-right: 10px;
margin-bottom: 10px;
flex-shrink: 0;
cursor: pointer;
color: white;
display: flex;
flex-direction: column;
padding: 10px;
box-sizing: border-box;
overflow: hidden;
position: relative;
justify-content: space-between;
`;

const Titlediv = styled.div`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
word-break: break-all;
width: 100%;
`;

const CategoryDiv = styled.div`
display: flex;
flex-direction: row;
`;

const Category = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
border-radius: 10px;
width: auto;
background-color: #383838;
color: white;
padding: 4px;
box-sizing: border-box;
font-size: 12px;
`;

const InfoDiv = styled.div`
display: flex;
flex-direction: row;
align-items: center;
span{
    margin-left: 3px;
}
`