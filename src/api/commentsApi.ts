import url from "./url";
import { getToken } from "../util/storage";

const authHeader = () => ({
  headers: {
    Authorization: getToken(),
  },
});

// 댓글 목록 조회
export const fetchComments = (postId: number) =>
  url.get(`/comment/${postId}`, authHeader());

// 댓글 작성
export const addComment = (postId: number, content: string) =>
  url.post(`/comment/${postId}`, { content }, authHeader());

// 대댓글 작성
export const addReply = (postId: number, parentId: number, content: string) =>
  url.post(`/comment/${postId}/${parentId}`, { content }, authHeader());

// 댓글 수정
export const updateComment = (commentId: number, content: string) =>
  url.put(`/comment/${commentId}`, { content }, authHeader());

// 댓글 삭제
export const deleteComment = (commentId: number) =>
  url.delete(`/comment/${commentId}`, authHeader());
