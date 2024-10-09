import React, { useState } from 'react';
import styled from 'styled-components';
import { PopularData } from '../../../tableData/PopularData';
import useDargX from '../../../hook/useDargX';

const Popular = () => {

    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();

    const [Populars,setPopulars] = useState(PopularData);

    // console.log(typeof(Populars));
    // console.log(Array.isArray(Populars));

    return (
        <PopularWrapper>
            <TitleDiv>
                <SectionTitle><strong>인기 게시글</strong></SectionTitle>
                <MoreBtn>더보기</MoreBtn>
            </TitleDiv>
            <PostDiv
            ref={DivRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}>
                {Populars.map(post => 
                    <PostInfo key={post.id}>
                        <Category>{post.category}</Category>
                        <PostTitle>{post.title}</PostTitle>
                        <InfoDiv>
                            <img src='/images/View_fill.png' alt='눈'/>
                            <span>{post.views}</span>
                            <img src='/images/thumb_up.png' alt='코'/>
                            <span>{post.likes}</span>
                            <img src='/images/Chat_alt.png' alt='입'/>
                            <span>{post.comments}</span>
                        </InfoDiv>
                        <PostImg src= {post.image} alt='post image'/>
                    </PostInfo>
                )}
            </PostDiv>
        </PopularWrapper>
    );
};

export default Popular;

const PopularWrapper = styled.div`
    width: 90%;
    overflow: hidden;
    margin-top: 10px;
`

const SectionTitle = styled.p`
    color: white;
`

const MoreBtn = styled.div`
    color: #AFAFAF;
    font-size: 14px;
    cursor: pointer;
`

const TitleDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const PostDiv = styled.div`
display: flex;
overflow-x:auto;
&::-webkit-scrollbar{
    display: none;
}
cursor: grab;
`

const PostInfo = styled.div`
width: 250px;
height: 100px;
background-color: #444444;
border-radius: 12px;
margin-right: 10px;
margin-bottom: 10px;
flex-shrink: 0;
cursor: pointer;
color: white;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
padding: 10px;
box-sizing: border-box;
overflow: hidden;
position: relative;
span{
    margin-left: 3px;
    margin-right: 2px;
    font-size: 14px;
}
`

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
/* color: #A2A2A2; */
`

const PostTitle = styled.div`
width: 60%;
font-size: 14px;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
word-break: break-all;
`

const PostImg = styled.img`
    position: absolute;
    left: 80%;
    top: 40%;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`