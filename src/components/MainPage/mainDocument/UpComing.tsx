import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDargX from "../../../hook/useDargX";
import { Link } from "react-router-dom";
import { getUpComingPost } from "../../../api/postApi";

import { UpComingPost } from '../../../types/Post';

const UpComing = () => {

    const [upComingPost, setUpComingPost] = useState<UpComingPost[]>([]);
    const { DivRef, handleMouseDown, handleMouseUp, handleMouseMove } = useDargX();

    const getUpComing = async () => {
        try {
            const res = await getUpComingPost();
            setUpComingPost(res);
        } catch (error) {
            alert("임박글 불러오기 성공");
        }
    }

    useEffect(() => {
        getUpComing();
    },[]);

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
        {upComingPost.map((post,idx) => (
            <UpcomingPost key={idx}>
                <CategoryDiv>
                    <Category></Category>
                </CategoryDiv>
                <div>
                    <StyledLink to={`/eachPost/${post.id}`}>
                        <Titlediv>{post.title}</Titlediv>
                    </StyledLink>
                    <InfoDiv>
                        <img src="/images/thumb_up.png" alt="북바크" />
                        <span></span>
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
  margin-top: ${({ theme }) => theme.sizes.spacing.lg};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const UpComingTitle = styled.p`
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

const UpComingPostDiv = styled.div`
  display: flex;
  flex-direction: row;
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

const UpcomingPost = styled.div`
  width: 140px;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  margin-right: ${({ theme }) => theme.sizes.spacing.sm};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
  flex-shrink: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  justify-content: space-between;
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
`;

const Titlediv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
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
  
  span {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
  &:hover {
    color: inherit;
  }
`;