
import type { RootState } from '@/redux/store';
import type React from 'react';
import { Oval } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const isAuthenticated = useSelector((store : RootState) => store.auth.isAuthenticated);
  const isLoading = useSelector((store : RootState) => store.auth.isLoading);

  const location = useLocation();

  if(isLoading){
    return(
      <div className="flex justify-center min-h-screen pt-5">
          <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              strokeWidth='2'
              animationDuration='1.5'
          />
      </div>
    )
  }

  if (!isAuthenticated && !isLoading  ) {
    <Navigate to={`?redirectTo=${encodeURIComponent(location.pathname)}`} replace />
    return (
      <div className='min-h-screen'>
        No Authorized For Access
      </div>
    );
  }

  return (
    (children)
  );
};

export default ProtectedRoute;