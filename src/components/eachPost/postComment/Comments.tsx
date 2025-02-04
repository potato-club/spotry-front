import React from "react";
import styled from "styled-components";
import { Comment } from "../../../types/Post";
import useComments from "../../../hook/useComments";

const Comments: React.FC = () => {
  const { comments, inputValue, setInputValue, addComment, likeComment } =
    useComments();

  return (
    <Container>
      {/* 댓글 리스트 */}
      {comments.length === 0 ? (
        <p>아직 작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((comment: Comment) => (
          <CommentBox key={comment.id}>
            <ProfileImage src={comment.user.profileImage} alt="Profile" />
            <CommentContent>
              <Header>
                <UserInfo>
                  {comment.user.name} · {comment.user.location} ·{" "}
                  {Math.floor(
                    (new Date().getTime() - comment.createdAt.getTime()) / 60000
                  )}{" "}
                  분 전
                </UserInfo>
                <LikeButton onClick={() => likeComment(comment.id)}>
                  좋아요 {comment.likes}
                </LikeButton>
              </Header>
              <Text>{comment.text}</Text>
            </CommentContent>
          </CommentBox>
        ))
      )}

      {/* 댓글 입력란 */}
      <CommentInputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <Button onClick={addComment}>작성</Button>
      </CommentInputContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-bottom: 70px;
`;

const CommentBox = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  font-size: 14px;
  color: #555;
`;

const Text = styled.p`
  margin: 8px 0;
`;

const LikeButton = styled.button`
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 16px;
  margin-left: 8px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Comments;
