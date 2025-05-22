import { useState, useEffect } from "react";
import * as api from "../api/comentsApi";
import { Comment } from "../types/Comment";

const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");

  const fetch = async () => {
    const res = await api.fetchComments(postId);
    setComments(buildCommentTree(res.data));
  };

  useEffect(() => {
    fetch();
  }, [postId]);

  const add = async () => {
    if (!inputValue.trim()) return;
    await api.addComment(postId, inputValue.trim());
    setInputValue("");
    fetch();
  };

  const edit = async (id: number, content: string) => {
    await api.updateComment(id, content);
    fetch();
  };

  const remove = async (id: number) => {
    await api.deleteComment(id);
    fetch();
  };

  const reply = async (parentId: number, content: string) => {
    await api.addReply(postId, parentId, content);
    fetch();
  };

  return {
    comments,
    inputValue,
    setInputValue,
    add,
    edit,
    remove,
    reply,
  };
};

export default useComments;

// 트리 구조 변환
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
