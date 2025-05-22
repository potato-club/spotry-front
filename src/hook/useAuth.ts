import { useState, useEffect } from 'react';
import { tokenManager } from '../util/tokenUtils';

/**
 * 토큰 기반 인증 상태를 관리하는 최적화된 훅
 * 1초마다 체크하는 대신 토큰 만료 이벤트를 구독
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return tokenManager.isTokenValid();
  });

  useEffect(() => {
    // 토큰 상태 변경 리스너 등록
    const unsubscribe = tokenManager.addListener((isValid) => {
      setIsAuthenticated(isValid);
    });

    // 컴포넌트 마운트 시 현재 상태 한 번 확인
    setIsAuthenticated(tokenManager.isTokenValid());

    // cleanup 함수 리턴
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isAuthenticated,
    login: (token: string) => tokenManager.setToken(token),
    logout: () => tokenManager.removeToken(),
    getToken: () => tokenManager.getToken(),
  };
};

/**
 * 토큰 만료 시간을 추적하는 훅
 */
export const useTokenExpiration = () => {
  const [timeUntilExpiration, setTimeUntilExpiration] = useState(() => {
    return tokenManager.getTimeUntilExpiration();
  });

  useEffect(() => {
    const updateTimer = () => {
      setTimeUntilExpiration(tokenManager.getTimeUntilExpiration());
    };

    // 1분마다 남은 시간 업데이트 (1초마다가 아님)
    const interval = setInterval(updateTimer, 60000);
    
    // 초기값 설정
    updateTimer();

    return () => clearInterval(interval);
  }, []);

  return {
    timeUntilExpiration,
    isExpiringSoon: timeUntilExpiration < 5 * 60 * 1000, // 5분 미만
  };
};
