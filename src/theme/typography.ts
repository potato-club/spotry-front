// 타이포그래피 시스템
export const typography = {
  // Font Sizes (글자 크기)
  fontSize: {
    xs: '10px',      // MenuBar name
    sm: '12px',      // SmallText
    md: '14px',      // 기본 텍스트, 입력 필드
    lg: '16px',      // 버튼, 헤더 타이틀, 일반 텍스트
    xl: '18px',      // CloseButton
    xxl: '28px',     // LoginPage 메인 텍스트
  },

  // Font Weights (글자 굵기)
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights (줄 간격)
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Letter Spacing (자간)
  letterSpacing: {
    tight: '-0.5px',
    normal: '0px',
    wide: '0.5px',
  }
} as const;

// 타이포그래피 타입 정의
export type TypographyKey = keyof typeof typography;
export type TypographyValue = typeof typography[TypographyKey];
