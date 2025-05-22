import { colors } from './colors';
import { sizes } from './sizes';
import { typography } from './typography';

// 메인 테마 객체
export const theme = {
  colors,
  sizes,
  typography,
} as const;

// 테마 타입 정의
export type Theme = typeof theme;
export type ThemeKey = keyof Theme;

// 개별 모듈들도 함께 export
export { colors } from './colors';
export { sizes } from './sizes'; 
export { typography } from './typography';

// 타입들도 함께 export
export type { ColorKey, ColorValue } from './colors';
export type { SizeKey, SizeValue } from './sizes';
export type { TypographyKey, TypographyValue } from './typography';
