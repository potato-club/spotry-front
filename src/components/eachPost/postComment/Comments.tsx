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
  width: 90%;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.large};
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.utility.shadow};
  
  p {
    color: ${({ theme }) => theme.colors.text.quaternary};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
    text-align: center;
    margin: ${({ theme }) => theme.sizes.spacing.xl} 0;
  }
`;

const CommentBox = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  padding-bottom: ${({ theme }) => theme.sizes.spacing.lg};
  
  &:last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const CommentContent = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
`;

const UserInfo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.quaternary};
`;

const Text = styled.p`
  margin: ${({ theme }) => theme.sizes.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

const MenuWrapper = styled.div`
  position: relative;
  margin-left: 8px;
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.quaternary};
  cursor: pointer;
  padding: ${({ theme }) => theme.sizes.spacing.xs};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.interactive.hover};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const Menu = styled.div`
  position: absolute;
  right: 0;
  top: 30px;
  background: ${({ theme }) => theme.colors.background.light};
  border: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  z-index: ${({ theme }) => theme.sizes.zIndex.dropdown};
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.utility.shadow};
  min-width: 80px;
`;

const MenuItem = styled.div`
  padding: ${({ theme }) => theme.sizes.spacing.sm} ${({ theme }) => theme.sizes.spacing.lg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.utility.black};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
  
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  }
  
  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
    border-bottom-right-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  }
`;

const ReplyButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.primary.main};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  padding: ${({ theme }) => theme.sizes.spacing.xs} ${({ theme }) => theme.sizes.spacing.sm};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.small};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.interactive.hover};
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

const EditForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  margin: ${({ theme }) => theme.sizes.spacing.sm} 0;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ReplyForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  margin: ${({ theme }) => theme.sizes.spacing.sm} 0 0 0;
  padding-top: ${({ theme }) => theme.sizes.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CommentInputContainer = styled.div`
  position: sticky;
  bottom: 0;
  width: 90%;
  padding: ${({ theme }) => theme.sizes.spacing.lg};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-top: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  border-radius: 0 0 ${({ theme }) => theme.sizes.borderRadius.large} ${({ theme }) => theme.sizes.borderRadius.large};
  margin-top: ${({ theme }) => theme.sizes.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.sizes.spacing.sm};
  align-items: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.background.quaternary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background.light};
  color: ${({ theme }) => theme.colors.utility.black};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: all 0.2s ease;
  min-width: 0;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.interactive.focus};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}33;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.quaternary};
  }
  
  @media (max-width: 480px) {
    margin-bottom: ${({ theme }) => theme.sizes.spacing.sm};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.sizes.spacing.md} ${({ theme }) => theme.sizes.spacing.xl};
  border: none;
  background-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.utility.black};
  border-radius: ${({ theme }) => theme.sizes.borderRadius.medium};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.light};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px ${({ theme }) => theme.colors.utility.shadow};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.interactive.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    transform: none;
  }
`;
