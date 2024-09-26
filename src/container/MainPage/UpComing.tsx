import React, { useState } from 'react';
import styled from 'styled-components';
import { PopularData } from '../../tableData/PopularData';
import useDargX from '../../hook/useDargX';

const UpComing = () => {

    const [upComingPost, setUpComingPost] = useState(PopularData);
    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();
    
    return (
        <Wrapper>
            <TitleDiv>
                <UpComingTitle><strong>모집 임박글</strong></UpComingTitle>
                <MoreBtn>더보기</MoreBtn>
            </TitleDiv>
            <UpComingPostDiv
            ref={DivRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            >
                {upComingPost.map(post => 
                    <UpcomingPost key={post.id}>
                        <span>{post.title}</span>
                    </UpcomingPost>)}
            </UpComingPostDiv>
        </Wrapper>
    );
};

export default UpComing;

const Wrapper = styled.div`
    width: 90%;
    margin-top: 10px;
`

const UpComingTitle = styled.p`
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

const UpComingPostDiv = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
`

const UpcomingPost = styled.div`
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
padding: 10px;
box-sizing: border-box;
overflow: hidden;
position: relative;
`