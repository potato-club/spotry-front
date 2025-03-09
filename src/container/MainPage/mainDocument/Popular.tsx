import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { Link, useNavigate } from 'react-router-dom';
import { getPopularPost } from '../../../api/postApi';

const Popular = () => {

    const navigate = useNavigate();

    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();

    const [populars,setPopulars] = useState([]);

    const getPopular = async () => {
        try {
            const res = await getPopularPost();
            setPopulars(res);
        } catch (error) {
            alert("인기 게시글 불러오기 실패");
        }
    }

    useEffect(() => {
        getPopular();
    },[]);

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
                {populars.map((post,idx) => 
                    <PostInfo key={idx}>
                        <Category></Category>
                        <Link to={`/eachPost/${idx}`}>
                            <PostTitle></PostTitle>
                        </Link>
                        
                        <InfoDiv>
                            <img src='/images/View_fill.png' alt='눈'/>
                            <span></span>
                            <img src='/images/thumb_up.png' alt='코'/>
                            <span></span>
                            <img src='/images/Chat_alt.png' alt='입'/>
                            <span></span>
                        </InfoDiv>
                        <PostImg src= '' alt='post image'/>
                    </PostInfo>
                )}
            </PostDiv>
        </PopularWrapper>
    );
};

export default Popular;

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