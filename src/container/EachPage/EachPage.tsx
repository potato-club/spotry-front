import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EachWrapper } from '../../styles/EachWrapper';
import useDragY from '../../hook/useDragY';
import useInfiniteScroll from '../../hook/useInfiniteScroll';
import { useNavigate } from 'react-router-dom';

// interface Post {
//     createdDate: string;
//     title: string;
//     content: string;
//     postState: string;
//     sport: string;
//     viewCount: number;
//     likeCount: number;
//     commentCount: number;
//     tag: string[];
//     image: string;
// }

// interface EachPageProps {
//     resultPost: Post[];
// }

const EachPage: React.FC<any> = ({ resultPost }) => {

    const navigate = useNavigate();

    const handleClickPost = (postId:number) => {
        navigate(`/eachPost/${postId}`);
    };
    
    // resultPost.map(post => ({
    //     ...post,
    // }))

    const [posts, setPosts] = useState([]);

    const { divRef, handleMouseDown, handleMouseUp, handleMouseMove } = useDragY();
    const { isEnd } = useInfiniteScroll(divRef);

    const fetchMore = () => {
        setTimeout(() => {
            console.log('추가 데이터 불러오기');
            const newPosts = Array.from({ length: 10 }, (_, i) => ({
                createdDate: new Date().toISOString(),
                title: `더미 게시물 ${i + 1}`,
                content: '새로운 게시물',
                postState: 'active',
                sport: '축구',
                viewCount: Math.floor(Math.random() * 100),
                likeCount: Math.floor(Math.random() * 50),
                commentCount: Math.floor(Math.random() * 20),
                tag: ['new', 'post'],
                image: '',
            })).map(post => ({
                ...post,
            }));

            // setPosts(prev => [...prev, ...newPosts]);
        }, 3000);
    };

    useEffect(() => {
        if (isEnd) {
            fetchMore();
        }
    }, [isEnd]);

    return (
        <EachWrapper
            ref={divRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {posts.map((value, idx) => (
                <PostInfoDiv key={idx}>
                    <Category>
                        {/* {value.sport} */}
                    </Category>
                    <div onClick={() => {
                        handleClickPost(idx);
                    }}>
                        {/* {value.title} */}
                        </div>
                    <TagWrapper>
                        {/* {value.tag.map((tag, index) => (
                            <Tag key={index}>#{tag}</Tag>
                        ))} */}
                    </TagWrapper>
                    <InfoWrapper>
                        <WhenAndView>
                            {/* <span>조회 {value.viewCount}</span> */}
                        </WhenAndView>
                        <LikeAndComment>
                            {/* <div>
                                <img src="/images/like.png" alt="view" />
                                <span>{value.likeCount}</span>
                                <img src="/images/Chat_alt.png" alt="댓글" />
                                <span>{value.commentCount}</span>
                            </div> */}
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
`;

const LikeAndComment = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    span {
        font-size: 14px;
    }
`;

const InfoWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

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
`;

const TagWrapper = styled.div`
    margin-top: 6px;
    margin-bottom: 8px;
    display: flex;
    gap: 8px;
`;

const Tag = styled.a`
    color: #6983A9;
    font-size: 12px;
`;

const WhenAndView = styled.div`
    display: flex;
    flex-direction: row;
    span {
        font-size: 12px;
    }
`;
