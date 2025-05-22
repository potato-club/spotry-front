export const sizes = {
  container: {
    mobile: '375px',      
    maxWidth: '375px',    
  },

  component: {
    button: {
      small: { width: '83px', height: '44px' },      
      medium: { width: '165.5px', height: '44px' },  
      large: { width: '343px', height: '52px' },     
      xlarge: { width: '343px', height: '56px' },    
    },
    
    input: {
      small: { width: '155px', height: '44px' },     
      medium: { width: '250px', height: '44px' },    
      large: { width: '343px', height: '44px' },     
      xlarge: { width: '343px', height: '56px' },    
      textarea: { width: '100%', height: '150px' },  
    },

    header: { width: '375px' },
    menuBar: { width: '375px', height: '58px' },
    barButton: { width: '75px', height: '40px' },

    icon: {
      small: { width: '28px', height: '28px' },      
      medium: { width: '56px', height: '78px' },     
      large: { width: '60px', height: '60px' },      
      profile: { width: '100px', height: '100px' },  
    },

    loginInput: { width: '343px', height: '200px' },
    searchBar: { width: '100%', height: '48px' },
  },

  spacing: {
    xs: '4px',
    sm: '8px', 
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xlarge: '16px',
    xxlarge: '20px',
    round: '50%',
  },

  zIndex: {
    base: 1,
    dropdown: 100,
    overlay: 500,
    modal: 1000,
    header: 1000,
    menuBar: 1000,
  }
} as const;

export type SizeKey = keyof typeof sizes;
export type SizeValue = typeof sizes[SizeKey];
