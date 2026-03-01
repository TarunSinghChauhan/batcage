import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { currentUser, setAuthModalOpen } = useAuth();

    if (!currentUser) {
        // Attempt logic: Open modal and send to home
        setAuthModalOpen(true);
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
