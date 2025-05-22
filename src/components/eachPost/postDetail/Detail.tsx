import styled from "styled-components";
import LikeIcon from "../../Data/LikeSvg";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clickLike, deletePost, getEachPost } from "../../../api/postApi";

interface eachPost {
  nickName: string;
  region: string;
  postDate: string;
  title: string;
  content: string;
  postState: string;
  sport: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tag: string[];
}

const Detail = () => {
  const navigate = useNavigate();

  const [eachPost, setEachPost] = useState<eachPost>();
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
      navigate("/post");
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
      <button onClick={() => handleDelete()}>삭제</button>
      <button>수정</button>
    </Details>
  );
};

export default Detail;

const Details = styled.div`
  width: 100%;
  color: white;
  padding: 15px;
  box-sizing: border-box;
`;

const ProfileWrapper = styled.div`
  margin-top: 14px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 32px;
    height: 32px;
  }
`;

const ProInfo = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
`;

const LikeDiv = styled.div`
  width: 65px;
  height: 25px;
  border: 1px solid #8d8d8d;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #8d8d8d;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 10px;
  background-color: #444444;
  color: white;
  padding: 4px 8px 4px 8px;
  box-sizing: border-box;
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 20px;
  margin-left: 6px;
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 15px;
`;

const ScriptDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 16px;
`;

const DetailScript = styled.div`
  display: flex;
  width: 100%;
  word-break: break-word;
  font-size: 15px;
`;

const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
`;
const Tags = styled.div`
  margin-right: 8px;
  color: #6983a9;
`;

const ViewConut = styled.div``;
