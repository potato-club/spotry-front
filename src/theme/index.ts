import { colors } from './colors';
import { sizes } from './sizes';
import { typography } from './typography';

export const theme = {
  colors,
  sizes,
  typography,
} as const;

export type Theme = typeof theme;
export type ThemeKey = keyof Theme;

export { colors } from './colors';
export { sizes } from './sizes'; 
export { typography } from './typography';

export type { ColorKey, ColorValue } from './colors';
export type { SizeKey, SizeValue } from './sizes';
export type { TypographyKey, TypographyValue } from './typography';
