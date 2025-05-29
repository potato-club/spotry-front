
export interface Comment {
  id: number;
  parent_id?: number;        
  nickName: string;
  region: string;
  commentDate: string;
  content: string;
  likeCount: number;
  replies?: Comment[];       
}


export interface CommentFormData {
  content: string;
  parent_id?: number;        
}


export interface CommentUpdateData {
  id: number;
  content: string;
}
