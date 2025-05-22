import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isTokenValid } from '../util/tokenUtils';


const PrivateRoute = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return isTokenValid();
    });

    useEffect(() => {
        const checkAuth = () => {
            const currentlyValid = isTokenValid();
            if (currentlyValid !== isAuthenticated) {
                setIsAuthenticated(currentlyValid);
            }
        };

        checkAuth();

        const handleFocus = () => checkAuth();
        window.addEventListener('focus', handleFocus);

        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, [isAuthenticated]);

    return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;