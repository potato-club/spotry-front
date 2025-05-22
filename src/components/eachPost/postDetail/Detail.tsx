import styled from "styled-components";
import LikeIcon from "../../Data/LikeSvg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppNavigation } from "../../../router";
import { clickLike, deletePost, getEachPost } from "../../../api/postApi";

import { PostDetail } from "../../../types/Post";

const Detail = () => {
  const { routes } = useAppNavigation();

  const [eachPost, setEachPost] = useState<PostDetail>();
  const { postId } = useParams();
  const id = postId ? parseInt(postId) : null;

  useEffect(() => {
    const fetchEachPost = async () => {
      try {
        const response = await getEachPost(id);
        setEachPost(response);
      } catch (error) {
        alert("게시글을 불러오지 못했습니다");
      }
    };
    fetchEachPost();
  }, []);

  const [isLike, setIsLike] = useState<boolean>(false);

  const toggleIcon = async () => {
    setIsLike((prev) => !prev);
  };

  useEffect(() => {
    if (isLike) {
      const likePost = async () => {
        try {
          console.log(id);
          console.log(typeof id);
          const response = await clickLike(id);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      likePost();
    }
  }, [isLike, id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await deletePost(id);
      alert("삭제되었습니다.");
      routes.post();
      return response;
    } catch (error) {
      alert("삭제 실패");
    }
  };

  return (
    <Details>
      <ProfileWrapper>
        <Profile>
          <img src="" alt="" />
          <ProInfo>
            <span>{eachPost?.nickName}</span>
            <span>
              {eachPost?.region} / {eachPost?.postDate}
            </span>
          </ProInfo>
        </Profile>
        <LikeDiv>
          <LikeIcon isLike={isLike} toggleIcon={toggleIcon} />
        </LikeDiv>
      </ProfileWrapper>
      <CategoryWrapper>
        <Category>{eachPost?.sport}</Category>
        <Category>{eachPost?.postState}</Category>
      </CategoryWrapper>
      <ScriptDiv>
        <Title>{eachPost?.title}</Title>
        <DetailScript>{eachPost?.content}</DetailScript>
      </ScriptDiv>
      <TagDiv>
        <Tags>{eachPost?.tag}</Tags>
      </TagDiv>
      <ViewConut>조회수 : {eachPost?.viewCount}</ViewConut>
      <ButtonWrapper>
        <DeleteButton onClick={() => handleDelete()}>삭제</DeleteButton>
        <EditButton>수정</EditButton>
      </ButtonWrapper>
    </Details>
  );
};

export default Detail;

const Details = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  box-sizing: border-box;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const ProfileWrapper = styled.div`
  margin-top: ${({ theme }) => theme.sizes.spacing.md};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  img {
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius.round};
    background-color: ${({ theme }) => theme.colors.background.quaternary};
    object-fit: cover;
  }
`;

const ProInfo = styled.div`
  margin-left: ${({ theme }) => theme.sizes.spacing.sm};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.sizes.spacing.xs};
  
  span:first-child {
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  span:last-child {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
`;

const LikeDiv = styled.div`
  width: 65px;
  height: 25px;
  border: 1px solid ${({ theme }) => theme.colors.text.quaternary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.quaternary};
  background-color: ${({ theme }) => theme.colors.utility.transparent};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const Category = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.sizes.spacing.xs} ${({ theme }) => theme.sizes.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const ScriptDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const DetailScript = styled.div`
  display: flex;
  width: 100%;
  word-break: break-word;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  white-space: pre-wrap;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const Tags = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const ViewConut = styled.div`
  color: ${({ theme }) => theme.colors.text.quaternary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: ${({ theme }) => theme.sizes.spacing.sm} ${({ theme }) => theme.sizes.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.status.warning};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.utility.black};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  padding: ${({ theme }) => theme.sizes.spacing.sm} ${({ theme }) => theme.sizes.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
