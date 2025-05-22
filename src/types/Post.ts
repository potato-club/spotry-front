// ========================================
// 게시글 관련 타입 정의
// ========================================

/**
 * 기본 게시글 인터페이스
 */
export interface Post {
  id: number;
  createdDate: string;
  title: string;
  content: string;           // 오타 수정: conten → content
  postState: string;
  sport: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tag: string[];             // 배열 타입 수정: [string] → string[]
}

/**
 * 게시글 상세 정보 (Detail 컴포넌트용)
 */
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

/**
 * 메인 페이지 게시글 (간소화된 정보)
 */
export interface MainPost {
  id: number;
  title: string;
  sport: string;
  likeCount: number;
}

/**
 * 크루 페이지 게시글
 */
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

/**
 * 인기 게시글 (Popular 컴포넌트용)
 */
export interface PopularPost {
  id: number;
  title: string;
  tags: string;
  viewCount: number;
  postLikes: number;
  commentCounts: number;
}

/**
 * 예정 게시글 (UpComing 컴포넌트용)
 */
export interface UpComingPost {
  id: number;
  title: string;
  tags: string[];
}

/**
 * 게시글 작성/수정 폼 데이터
 */
export interface PostFormData {
  title: string;
  content: string;
  sport: string;
  postState: string;
  tag: string[];
}

