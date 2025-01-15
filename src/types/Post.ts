export interface Post {
  createdDate: string;
  title: string;
  conten: string;
  postState: string;
  sport: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tag: [string];
}

export interface MainPost {
  id: number;
  title: string;
  sport: string;
  likeCount: number;
}

export interface CrewPost extends MainPost {
  id: number;
}

export interface User {
  name: string;
  profileImage: string;
  location: string;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  createdAt: Date;
  likes: number;
}
