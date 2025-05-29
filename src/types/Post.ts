
export interface Post {
  id: number;
  createdDate: string;
  title: string;
  content: string;           
  postState: string;
  sport: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tag: string[];             
}


export interface PostDetail {
  id: number;
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

export interface MainPost {
  id: number;
  title: string;
  sport: string;
  likeCount: number;
}

export interface CrewPost {
  id: number;
  region: string;
  postDate: string;
  title: string;
  postState: string;
  sport: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tag: string[];
}

export interface PopularPost {
  id: number;
  title: string;
  tags: string;
  viewCount: number;
  postLikes: number;
  commentCounts: number;
}

export interface UpComingPost {
  id: number;
  title: string;
  tags: string[];
}

export interface PostFormData {
  title: string;
  content: string;
  sport: string;
  postState: string;
  tag: string[];
}

