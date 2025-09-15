import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        toast.error('You must be logged in to access this page.');
        return <Navigate to='/login' replace />;
    }
    return children;
}

export default PrivateRoute;