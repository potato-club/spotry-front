export const colors = {
  primary: {
    main: '#C1F84D',        
    light: '#B0FF5E',       
    dark: '#373934',        
  },

  background: {
    primary: '#2B2B2B',     
    secondary: '#333333',   
    tertiary: '#444444',    
    quaternary: '#555555',  
    light: '#F0F0F0',       
  },

  text: {
    primary: '#FFFFFF',     
    secondary: '#BBBBBB',   
    tertiary: '#B1B1B1',   
    quaternary: '#8D8D8D',  
    inactive: '#666666',    
    disabled: '#A7A7A7',    
  },

  status: {
    success: '#B0FF5E',     
    error: '#FF4040',       
    warning: '#FF6666',     
    info: '#C1F84D',        
  },

  interactive: {
    hover: '#373934',       
    active: '#C1F84D',      
    focus: '#C1F84D',       
    disabled: '#5D5D5D',    
  },

  utility: {
    transparent: 'transparent',
    black: '#000000',
    white: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.2)',  
    shadow: 'rgba(0, 0, 0, 0.3)',  
  }
} as const;

export type ColorKey = keyof typeof colors;
export type ColorValue = typeof colors[ColorKey];
