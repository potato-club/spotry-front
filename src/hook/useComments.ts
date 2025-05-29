import { useState, useEffect, useCallback } from "react";
import * as api from "../api/commentApi";
import { Comment } from "../types/Comment";

const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    
    try {
      setLoading(true);
      setError(null);
      const res = await api.fetchComments(postId);
      setComments(buildCommentTree(res.data));
    } catch (error) {
      console.error("댓글을 불러오는데 실패했습니다:", error);
      setError("댓글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const add = useCallback(async () => {
    if (!inputValue.trim()) return;
    
    try {
      await api.addComment(postId, inputValue.trim());
      setInputValue("");
      await fetchComments(); 
    } catch (error) {
      console.error("댓글 추가 실패:", error);
      throw error;
    }
  }, [postId, inputValue, fetchComments]);

  const edit = useCallback(async (id: number, content: string) => {
    try {
      await api.updateComment(id, content);
      await fetchComments();
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      throw error;
    }
  }, [fetchComments]);

  const remove = useCallback(async (id: number) => {
    try {
      await api.deleteComment(id);
      await fetchComments();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      throw error;
    }
  }, [fetchComments]);

  const reply = useCallback(async (parentId: number, content: string) => {
    try {
      await api.addReply(postId, parentId, content);
      await fetchComments();
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
      throw error;
    }
  }, [postId, fetchComments]);

  return {
    comments,
    loading,
    error,
    inputValue,
    setInputValue,
    add,
    edit,
    remove,
    reply,
    refetch: fetchComments
  };
};

export default useComments;

function buildCommentTree(flat: Comment[]): Comment[] {
  const map = new Map<number, Comment>();
  const roots: Comment[] = [];
  
  flat.forEach((c) => map.set(c.id, { ...c, replies: [] }));
  
  flat.forEach((c) => {
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies!.push(map.get(c.id)!);
    } else {
      roots.push(map.get(c.id)!);
    }
  });
  
  return roots;
}
