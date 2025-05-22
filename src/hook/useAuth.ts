import { useState, useEffect } from 'react';
import { tokenManager } from '../util/tokenUtils';


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return tokenManager.isTokenValid();
  });

  useEffect(() => {
    const unsubscribe = tokenManager.addListener((isValid) => {
      setIsAuthenticated(isValid);
    });

    setIsAuthenticated(tokenManager.isTokenValid());

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


export const useTokenExpiration = () => {
  const [timeUntilExpiration, setTimeUntilExpiration] = useState(() => {
    return tokenManager.getTimeUntilExpiration();
  });

  useEffect(() => {
    const updateTimer = () => {
      setTimeUntilExpiration(tokenManager.getTimeUntilExpiration());
    };

    const interval = setInterval(updateTimer, 60000);
    
    updateTimer();

    return () => clearInterval(interval);
  }, []);

  return {
    timeUntilExpiration,
    isExpiringSoon: timeUntilExpiration < 5 * 60 * 1000, 
  };
};
