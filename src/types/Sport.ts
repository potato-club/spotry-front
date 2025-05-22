// ========================================
// 스포츠 관련 타입 정의
// ========================================

/**
 * 기본 스포츠 정보
 */
export interface Sport {
  id: number;
  name: string;
}

/**
 * 스포츠 목록 응답 타입
 */
export interface SportsResponse {
  data: Sport[];
  total: number;
}

/**
 * 스포츠 세부 정보
 */
export interface SportDetail extends Sport {
  description?: string;
  category?: string;
  popularity?: number;
}

/**
 * HOT 스포츠 섹션에서 사용하는 타입
 */
export interface HotSport {
  id: number;
  name: string;
  imageUrl?: string;
  isPopular?: boolean;
}
