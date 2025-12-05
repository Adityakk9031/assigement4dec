// Simple protected route wrapper that redirects to /login when no token is present.
import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;





