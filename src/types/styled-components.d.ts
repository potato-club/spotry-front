import 'styled-components';

// 테마 타입 정의
export interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      light: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
      inactive: string;
      disabled: string;
    };
    status: {
      success: string;
      error: string;
      warning: string;
      info: string;
    };
    interactive: {
      hover: string;
      active: string;
      focus: string;
      disabled: string;
    };
    utility: {
      transparent: string;
      black: string;
      white: string;
      overlay: string;
      shadow: string;
    };
  };
  sizes: {
    container: {
      mobile: string;
      maxWidth: string;
    };
    component: {
      button: {
        small: { width: string; height: string };
        medium: { width: string; height: string };
        large: { width: string; height: string };
        xlarge: { width: string; height: string };
      };
      input: {
        small: { width: string; height: string };
        medium: { width: string; height: string };
        large: { width: string; height: string };
        xlarge: { width: string; height: string };
        textarea: { width: string; height: string };
      };
      header: { width: string };
      menuBar: { width: string; height: string };
      barButton: { width: string; height: string };
      icon: {
        small: { width: string; height: string };
        medium: { width: string; height: string };
        large: { width: string; height: string };
        profile: { width: string; height: string };
      };
      loginInput: { width: string; height: string };
      searchBar: { width: string; height: string };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      round: string;
    };
    zIndex: {
      base: number;
      dropdown: number;
      overlay: number;
      modal: number;
      header: number;
      menuBar: number;
    };
  };
  typography: {
    fontSize: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
    letterSpacing: {
      tight: string;
      normal: string;
      wide: string;
    };
  };
}

// styled-components의 DefaultTheme을 우리 테마로 확장
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
