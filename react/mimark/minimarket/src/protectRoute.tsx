import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './auth/AuthProvider.js';

const ProtectRoute = () => {
    const auth = useAuth();
    return auth.isAuthenticating ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectRoute;