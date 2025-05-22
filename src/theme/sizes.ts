// 현재 고정된 크기들을 정리한 사이즈 시스템
export const sizes = {
  // Container Widths (컨테이너 너비)
  container: {
    mobile: '375px',      // 현재 고정 크기
    maxWidth: '375px',    // 최대 너비
  },

  // Component Sizes (컴포넌트 크기)
  component: {
    // Buttons
    button: {
      small: { width: '83px', height: '44px' },      // CheckButton
      medium: { width: '165.5px', height: '44px' },  // GenderButton  
      large: { width: '343px', height: '52px' },     // 기본 버튼
      xlarge: { width: '343px', height: '56px' },    // 로그인 버튼
    },
    
    // Inputs
    input: {
      small: { width: '155px', height: '44px' },     // EmailInput
      medium: { width: '250px', height: '44px' },    // ID 입력
      large: { width: '343px', height: '44px' },     // 기본 입력
      xlarge: { width: '343px', height: '56px' },    // 로그인 입력
      textarea: { width: '100%', height: '150px' },  // WritePost textarea
    },

    // Navigation
    header: { width: '375px' },
    menuBar: { width: '375px', height: '58px' },
    barButton: { width: '75px', height: '40px' },

    // Icons & Images
    icon: {
      small: { width: '28px', height: '28px' },      // MenuBar icons
      medium: { width: '56px', height: '78px' },     // Hot section icons
      large: { width: '60px', height: '60px' },      // WriteButton
      profile: { width: '100px', height: '100px' },  // Profile image
    },

    // Content Areas
    loginInput: { width: '343px', height: '200px' },
    searchBar: { width: '100%', height: '48px' },
  },

  // Spacing (여백)
  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  // Border Radius (모서리 둥글기)
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    xxlarge: '20px',
    round: '50%',
  },

  // Z-Index (레이어 순서)
  zIndex: {
    base: 1,
    dropdown: 100,
    overlay: 500,
    modal: 1000,
    header: 1000,
    menuBar: 1000,
  }
} as const;

// 사이즈 타입 정의
export type SizeKey = keyof typeof sizes;
export type SizeValue = typeof sizes[SizeKey];
