
import type { RootState } from '@/redux/store';
import type React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const isAuthenticated = useSelector((store : RootState) => store.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    <Navigate to={`?redirectTo=${encodeURIComponent(location.pathname)}`} replace />
    return (
      <div className='min-h-screen'>
        No Authorized For Access
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;