import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authApi';

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute; 