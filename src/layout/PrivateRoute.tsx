import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getToken } from '../util/storage';

const PrivateRoute = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!getToken());
        };

        

        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);

    return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default PrivateRoute;