import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isTokenValid } from '../util/tokenUtils';

/**
 * 임시로 기존 방식 유지 (토큰 체크 최적화 적용)
 * TODO: useAuth 훅 안정화 후 교체 예정
 */
const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return isTokenValid();
    });

    useEffect(() => {
        // 토큰 유효성을 한 번만 체크 (1초마다 체크하지 않음)
        const checkAuth = () => {
            const currentlyValid = isTokenValid();
            if (currentlyValid !== isAuthenticated) {
                setIsAuthenticated(currentlyValid);
            }
        };

        // 즉시 한 번 체크
        checkAuth();

        // 페이지 포커스시에만 재체크 (성능 최적화)
        const handleFocus = () => checkAuth();
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;