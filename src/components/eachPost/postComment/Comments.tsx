import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useComments from "../../../hook/useComments";
import { Comment } from "../../../types/Comment";

const Comments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const id = postId ? parseInt(postId, 10) : NaN;

  const { comments, inputValue, setInputValue, add, edit, remove, reply } =
    useComments(id);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [replyToId, setReplyToId] = useState<number | null>(null);
  const [replyValue, setReplyValue] = useState("");
  const [showMenuId, setShowMenuId] = useState<number | null>(null);

  if (isNaN(id)) {
    return <p>잘못된 접근입니다.</p>;
  }

  const renderComment = (comment: Comment, depth = 0): JSX.Element => (
    <CommentBox key={comment.id} style={{ marginLeft: depth * 20 }}>
      <CommentContent>
        <Header>
          <UserInfo>
            {comment.nickName} · {comment.region} ·{" "}
            {Math.floor(
              (Date.now() - new Date(comment.commentDate).getTime()) / 60000
            )}
            분 전
          </UserInfo>
          <MenuWrapper>
            <MenuButton
              onClick={() =>
                setShowMenuId(showMenuId === comment.id ? null : comment.id)
              }
            >
              …
            </MenuButton>
            {showMenuId === comment.id && (
              <Menu>
                <MenuItem
                  onClick={() => {
                    setEditingId(comment.id);
                    setEditValue(comment.content);
                    setShowMenuId(null);
                  }}
                >
                  수정
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    try {
                      await remove(comment.id);
                    } catch {
                      alert("권한이 없습니다!");
                    }
                    setShowMenuId(null);
                  }}
                >
                  삭제
                </MenuItem>
              </Menu>
            )}
          </MenuWrapper>
          <ReplyButton
            onClick={() => {
              setReplyToId(comment.id);
              setReplyValue("");
            }}
          >
            답글
          </ReplyButton>
        </Header>

        {editingId === comment.id ? (
          <EditForm>
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button
              onClick={() => {
                edit(comment.id, editValue);
                setEditingId(null);
              }}
            >
              저장
            </Button>
            <Button onClick={() => setEditingId(null)}>취소</Button>
          </EditForm>
        ) : (
          <Text>{comment.content}</Text>
        )}

        {replyToId === comment.id && (
          <ReplyForm>
            <Input
              value={replyValue}
              onChange={(e) => setReplyValue(e.target.value)}
            />
            <Button
              onClick={() => {
                reply(comment.id, replyValue);
                setReplyToId(null);
              }}
            >
              답글달기
            </Button>
            <Button onClick={() => setReplyToId(null)}>취소</Button>
          </ReplyForm>
        )}

        {comment.replies?.map((r) => renderComment(r, depth + 1))}
      </CommentContent>
    </CommentBox>
  );

  return (
    <Container>
      {comments.length === 0 ? (
        <p>아직 작성된 댓글이 없습니다.</p>
      ) : (
        comments.map((c) => renderComment(c, 0))
      )}
      <CommentInputContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <Button onClick={add}>작성</Button>
      </CommentInputContainer>
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const CommentBox = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  font-size: 14px;
  color: #555;
`;

const Text = styled.p`
  margin: 8px 0;
`;

const MenuWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const ReplyButton = styled.button`
  border: none;
  background: none;
  color: #007bff;
  cursor: pointer;
`;

const EditForm = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0;
`;

const ReplyForm = styled.div`
  display: flex;
  gap: 8px;
  margin: 8px 0 0 0;
`;

const CommentInputContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
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
