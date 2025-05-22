import url from "./url";

// 댓글 목록 조회
export const fetchComments = (postId: number) => url.get(`/comment/${postId}`);

// 댓글 작성
export const addComment = (postId: number, content: string) =>
  url.post(`/comment/${postId}`, { content });

// 대댓글 작성
export const addReply = (postId: number, parentId: number, content: string) =>
  url.post(`/comment/${postId}/${parentId}`, { content });

// 댓글 수정
export const updateComment = (commentId: number, content: string) =>
  url.put(`/comment/${commentId}`, { content });

// 댓글 삭제
export const deleteComment = (commentId: number) =>
  url.delete(`/comment/${commentId}`);
