
interface AvatarOptions {
  name: string;
  size?: number;
  gender?: 'MALE' | 'FEMALE' | string;
  backgroundColor?: string;
  textColor?: string;
}


const getInitials = (name: string): string => {
  if (!name) return '?';
  
  if (/[가-힣]/.test(name)) {
    return name.charAt(0);
  }
  
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  const firstInitial = words[0].charAt(0);
  const lastInitial = words[words.length - 1].charAt(0);
  return (firstInitial + lastInitial).toUpperCase();
};


const getColorFromName = (name: string): { background: string; text: string } => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    { bg: '#FF6B6B', text: '#FFFFFF' }, 
    { bg: '#4ECDC4', text: '#FFFFFF' }, 
    { bg: '#45B7D1', text: '#FFFFFF' }, 
    { bg: '#96CEB4', text: '#FFFFFF' }, 
    { bg: '#FFEAA7', text: '#2D3436' }, 
    { bg: '#DDA0DD', text: '#FFFFFF' }, 
    { bg: '#98D8C8', text: '#FFFFFF' }, 
    { bg: '#F7DC6F', text: '#2D3436' }, 
    { bg: '#BB8FCE', text: '#FFFFFF' }, 
    { bg: '#85C1E9', text: '#FFFFFF' }, 
  ];
  
  const index = Math.abs(hash) % colors.length;
  return {
    background: colors[index].bg,
    text: colors[index].text
  };
};


export const generateInitialAvatar = (options: AvatarOptions): string => {
  const {
    name,
    size = 100,
    backgroundColor,
    textColor,
  } = options;
  
  const initials = getInitials(name);
  const colors = backgroundColor && textColor 
    ? { background: backgroundColor, text: textColor }
    : getColorFromName(name);
  
  const fontSize = size * 0.4;
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle 
        cx="${size/2}" 
        cy="${size/2}" 
        r="${size/2}" 
        fill="${colors.background}"
      />
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="600" 
        fill="${colors.text}"
      >
        ${initials}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
};


export const getDefaultAvatarByGender = (gender: 'MALE' | 'FEMALE' | string): string => {
  const genderUpper = gender.toUpperCase();
  
  switch (genderUpper) {
    case 'MALE':
      return '/images/default-male-avatar.svg';
    case 'FEMALE':
      return '/images/default-female-avatar.svg';
    default:
      return '/images/default-neutral-avatar.svg';
  }
};


export const getProfileImageUrl = (
  profileUrl?: string | null,
  name?: string,
  gender?: 'MALE' | 'FEMALE' | string,
  size: number = 100
): string => {
  if (profileUrl && profileUrl.trim() !== '') {
    return profileUrl;
  }
  
  if (name && name.trim() !== '') {
    return generateInitialAvatar({ name, size, gender });
  }
  
  if (gender) {
    return getDefaultAvatarByGender(gender);
  }
  
  return '/images/default-neutral-avatar.svg';
};


export const handleProfileImageError = (
  event: React.SyntheticEvent<HTMLImageElement>,
  fallbackName?: string,
  fallbackGender?: string,
  size?: number
) => {
  const img = event.currentTarget;
  
  if (img.src.startsWith('data:image/svg+xml') || img.src.includes('default-')) {
    return;
  }
  
  img.src = getProfileImageUrl(null, fallbackName, fallbackGender, size);
};
