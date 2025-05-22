export const colors = {
  // Primary Colors (메인 브랜드 컬러)
  primary: {
    main: '#C1F84D',        // 메인 버튼, 활성 상태
    light: '#B0FF5E',       // 성공 메시지
    dark: '#373934',        // 활성 배경
  },

  // Background Colors (배경색)
  background: {
    primary: '#2B2B2B',     // 메인 컨테이너 배경
    secondary: '#333333',   // 헤더, 메뉴바, 페이지 배경
    tertiary: '#444444',    // 입력 필드, 검색바 배경
    quaternary: '#555555',  // 옵션, 테두리
    light: '#F0F0F0',       // 밝은 배경 (마이페이지 프로필)
  },

  // Text Colors (텍스트 색상)
  text: {
    primary: '#FFFFFF',     // 메인 텍스트
    secondary: '#BBBBBB',   // 입력 플레이스홀더
    tertiary: '#B1B1B1',   // 라벨, 보조 텍스트
    quaternary: '#8D8D8D',  // 비활성 텍스트
    inactive: '#666666',    // 비활성 아이콘, 메뉴
    disabled: '#A7A7A7',    // 버튼 비활성 텍스트
  },

  // Status Colors (상태 색상)
  status: {
    success: '#B0FF5E',     // 성공 메시지
    error: '#FF4040',       // 에러 메시지 
    warning: '#FF6666',     // 경고, 폼 에러
    info: '#C1F84D',        // 정보성 메시지
  },

  // Interactive Colors (인터랙션 색상)
  interactive: {
    hover: '#373934',       // 호버 상태 배경
    active: '#C1F84D',      // 활성 상태
    focus: '#C1F84D',       // 포커스 테두리
    disabled: '#5D5D5D',    // 비활성 버튼 배경
  },

  // Utility Colors (유틸리티 색상)
  utility: {
    transparent: 'transparent',
    black: '#000000',
    white: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.2)',  // 블러 오버레이
    shadow: 'rgba(0, 0, 0, 0.3)',   // 그림자
  }
} as const;

// 색상 타입 정의
export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];
