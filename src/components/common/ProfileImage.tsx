import React, { useState } from 'react';
import styled from 'styled-components';
import { getProfileImageUrl, handleProfileImageError } from '../../util/avatarUtils';

interface ProfileImageProps {
  profileUrl?: string | null;
  name?: string;
  gender?: 'MALE' | 'FEMALE' | string;
  size?: 'small' | 'medium' | 'large' | number;
  className?: string;
  onClick?: () => void;
  showBorder?: boolean;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}


const ProfileImage: React.FC<ProfileImageProps> = ({
  profileUrl,
  name = '',
  gender = '',
  size = 'medium',
  className,
  onClick,
  showBorder = true,
  showOnlineStatus = false,
  isOnline = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sizeMap = {
    small: 40,
    medium: 60,
    large: 100,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const imageUrl = hasError 
    ? getProfileImageUrl(null, name, gender, actualSize)
    : getProfileImageUrl(profileUrl, name, gender, actualSize);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (!hasError) {
      setHasError(true);
      handleProfileImageError(event, name, gender, actualSize);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Container 
      size={actualSize} 
      className={className}
      onClick={onClick}
      clickable={!!onClick}
      showBorder={showBorder}
    >
      {isLoading && <LoadingSpinner size={actualSize} />}
      
      <StyledImage
        src={imageUrl}
        alt={`${name || '사용자'} 프로필`}
        size={actualSize}
        onError={handleError}
        onLoad={handleLoad}
        isLoading={isLoading}
      />
      
      {showOnlineStatus && (
        <OnlineStatus isOnline={isOnline} size={actualSize} />
      )}
    </Container>
  );
};

export default ProfileImage;

const Container = styled.div<{
  size: number;
  clickable: boolean;
  showBorder: boolean;
}>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  overflow: hidden;
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  border: ${({ showBorder, theme }) => 
    showBorder ? `2px solid ${theme.colors.primary.main}` : 'none'};
  
  transition: all 0.2s ease;
  
  ${({ clickable }) => clickable && `
    &:hover {
      transform: scale(1.05);
    }
    
    &:active {
      transform: scale(0.95);
    }
  `}
`;

const StyledImage = styled.img<{
  size: number;
  isLoading: boolean;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ isLoading }) => isLoading ? 'none' : 'block'};
  transition: opacity 0.3s ease;
`;

const LoadingSpinner = styled.div<{ size: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ size }) => Math.min(size * 0.4, 20)}px;
  height: ${({ size }) => Math.min(size * 0.4, 20)}px;
  border: 2px solid ${({ theme }) => theme.colors.background.quaternary};
  border-top: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const OnlineStatus = styled.div<{
  isOnline: boolean;
  size: number;
}>`
  position: absolute;
  bottom: ${({ size }) => size * 0.05}px;
  right: ${({ size }) => size * 0.05}px;
  width: ${({ size }) => size * 0.25}px;
  height: ${({ size }) => size * 0.25}px;
  border-radius: 50%;
  background-color: ${({ isOnline, theme }) => 
    isOnline ? theme.colors.status.success : theme.colors.text.quaternary};
  border: 2px solid ${({ theme }) => theme.colors.background.primary};
  
  ${({ isOnline }) => isOnline && `
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `}
`;
