export type Comment = {
  parent_id: number;
  id: number;
  nickName: string;
  region: string;
  commentDate: string;
  content: string;
  likeCount: number;
  replies?: Comment[];
};
