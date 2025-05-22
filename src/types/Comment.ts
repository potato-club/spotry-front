// ========================================
// 댓글 관련 타입 정의
// ========================================

/**
 * 댓글 인터페이스 (계층형 구조 지원)
 */
export interface Comment {
  id: number;
  parent_id?: number;        // 대댓글용 부모 ID (선택적)
  nickName: string;
  region: string;
  commentDate: string;
  content: string;
  likeCount: number;
  replies?: Comment[];       // 대댓글 배열 (재귀적 구조)
}

/**
 * 댓글 작성 폼 데이터
 */
export interface CommentFormData {
  content: string;
  parent_id?: number;        // 대댓글인 경우 부모 댓글 ID
}

/**
 * 댓글 수정 데이터
 */
export interface CommentUpdateData {
  id: number;
  content: string;
}
