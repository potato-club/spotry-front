import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PopularData } from '../../tableData/PopularData';
import { EachWrapper } from '../../styles/EachWrapper';
import useDragY from '../../hook/useDragY';
import useInfiniteScroll from '../../hook/useInfiniteScroll';

interface post{
    createdDate: string,
    title: string,
    content: string,
    postState: string,
    sport: string,
    viewCount: number,
    likeCount: number,
    commentCount: number,
    tag: string[],
    image: string
}

interface EachPageProps{
    resultPost : post[]
}

const EachPage:React.FC<EachPageProps> = ({resultPost}) => {

    const navigation = useNavigate();

    const {divRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDragY();

    const isEnd = useInfiniteScroll();

    useEffect(() => {
        if (isEnd) {
            alert('스크롤이 닿았습니다!');
        }
    },[isEnd])

    const checkRelativeTime = (createDate:string) => {
        const created = new Date(createDate).getTime();
        const now = new Date().getTime();
        const relative = now - created;

        const diffInSeconds = Math.floor(relative / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInMonths / 12);

        if (diffInYears > 0) {
            return `${diffInYears}년전`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths}개월전`;
        } else if (diffInDays > 0) {
            return `${diffInDays}일전`;
        } else if (diffInHours > 0) {
            return `${diffInHours}시간전`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes}분전`;
        } else {
            return `${diffInSeconds}초전`;
        }
    };

    return (
        <EachWrapper
        ref={divRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        >
            {resultPost.map((value,idx) => (
                <PostInfoDiv key={idx}>
                    <Category>
                        {value.sport}
                    </Category>
                    {value.title}<br/>
                    <TagWrapper>
                        {value.tag.map((tag, index) => (
                            <Tag key={index}>#{tag}</Tag>
                    ))}
                    </TagWrapper>
                    <InfoWrapper>
                        <WhenAndView>
                            <span>{checkRelativeTime(value.createdDate)}&middot;</span>
                            <span>조회 {value.viewCount}</span>
                        </WhenAndView>
                        <LikeAndComment>
                            <div>
                                <img src='/images/like.png' alt='view'/>
                                <span>{value.likeCount}</span>
                                <img src='/images/Chat_alt.png' alt='댓글'/>
                                <span>{value.commentCount}</span>
                            </div>
                        </LikeAndComment>
                    </InfoWrapper>
                </PostInfoDiv>
            ))}
        </EachWrapper>
    );
};

export default EachPage;

const PostInfoDiv = styled.div`
padding: 8px;
height: auto;
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
color: white;
border-bottom: 1px solid #8D8D8D;
box-sizing: border-box;
`

const LikeAndComment = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
div{
    display: flex;
    flex-direction: row;
    align-items: center;
}
span{
    font-size: 14px;
}
`

const InfoWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const Category = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
border-radius: 10px;
width: auto;
background-color: #444444;
color: white;
padding: 4px;
box-sizing: border-box;
font-size: 12px;
margin-bottom: 8px;
`

const TagWrapper = styled.div`
margin-top: 6px;
margin-bottom: 8px;
display: flex;
gap: 8px;
`

const Tag = styled.a`
color: #6983A9;
font-size: 12px;
`

const WhenAndView = styled.div`
display: flex;
flex-direction: row;
span{
    font-size: 12px;
}
`