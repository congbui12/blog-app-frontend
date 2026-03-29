import type { JSX } from 'react';
import { useAuth } from '../hooks';
import { useLocation, Navigate } from 'react-router-dom';
import PageLoader from '../components/basics/PageLoader';

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <PageLoader isOpen={isLoading} />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoutes;
