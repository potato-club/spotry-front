import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDargX from '../../../hook/useDargX';
import { Link, useNavigate } from 'react-router-dom';
import { getPopularPost } from '../../../api/postApi';

import { PopularPost } from '../../../types/Post';

const Popular = () => {

    const navigate = useNavigate();

    const {DivRef,handleMouseDown,handleMouseUp,handleMouseMove} = useDargX();

    const [populars,setPopulars] = useState<PopularPost[]>([]);

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
                        <StyledLink to={`/eachPost/${post.id}`}>
                            <PostTitle>{post.title}</PostTitle>
                        </StyledLink>
                        
                        <InfoDiv>
                            <img src='/images/View_fill.png' alt='눈'/>
                            <span>{post.viewCount}</span>
                            <img src='/images/thumb_up.png' alt='코'/>
                            <span>{post.postLikes}</span>
                            <img src='/images/Chat_alt.png' alt='입'/>
                            <span>{post.commentCounts}</span>
                        </InfoDiv>
                        <PostImg src= '' alt=''/>
                    </PostInfo>
                )}
            </PostDiv>
        </PopularWrapper>
    );
};

export default Popular;

const PostInfo = styled.div`
  width: 250px;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  margin-right: ${({ theme }) => theme.sizes.spacing.sm};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.background.quaternary};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.utility.shadow};
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:last-child {
    margin-right: 0;
  }

  span {
    margin-left: ${({ theme }) => theme.sizes.spacing.xs};
    margin-right: ${({ theme }) => theme.sizes.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const PopularWrapper = styled.div`
  width: 90%;
  overflow: hidden;
  margin-top: ${({ theme }) => theme.sizes.spacing.lg};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const SectionTitle = styled.p`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin: 0;
`;

const MoreBtn = styled.div`
  color: ${({ theme }) => theme.colors.text.quaternary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.md};
`;

const PostDiv = styled.div`
  display: flex;
  overflow-x: auto;
  padding: ${({ theme }) => theme.sizes.spacing.sm} 0;
  cursor: grab;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const Category = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.quaternary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.sizes.spacing.xs} ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.xs};
  align-self: flex-start;
`;

const PostTitle = styled.div`
  width: 70%;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.xs};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const PostImg = styled.img`
  position: absolute;
  right: ${({ theme }) => theme.sizes.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  object-fit: cover;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.spacing.xs};
  
  img {
    width: 14px;
    height: 14px;
    opacity: 0.7;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  
  &:hover {
    color: inherit;
  }
`;