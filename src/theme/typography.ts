export const typography = {
  fontSize: {
    xs: '10px',      
    sm: '12px',      
    md: '14px',      
    lg: '16px',      
    xl: '18px',      
    xxl: '28px',     
  },

  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  letterSpacing: {
    tight: '-0.5px',
    normal: '0px',
    wide: '0.5px',
  }
} as const;

export type TypographyKey = keyof typeof typography;
export type TypographyValue = typeof typography[TypographyKey];
