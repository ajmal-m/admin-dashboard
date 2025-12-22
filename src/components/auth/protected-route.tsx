
import type { AppDispatch, RootState } from '@/redux/store';
import type React from 'react';
import { Oval } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import { memo, useCallback, useEffect } from 'react';
import { openLogInPopUp } from '@/redux/features/popup';



const UnAuthorizedRoot = memo(() => {
  const dispatch = useDispatch<AppDispatch>();
  const openLogin = useCallback(() => {
      dispatch(openLogInPopUp());
    },[]);
    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(openLogInPopUp());
      },700);
      return () => {
        clearTimeout(timer);
      }
    },[dispatch])
  return(
    <div className='min-h-screen flex flex-col items-center'>
      <h1 className='text-[16px] text-black font-mont font-medium text-center mt-4'>Not Authorized Access and Please Login</h1>
      <Button className='text-[12px] text-white bg-green-800 rounded font-mont' onClick={openLogin}>Login</Button>
    </div>
  )
});



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  const isAuthenticated = useSelector((store : RootState) => store.auth.isAuthenticated);
  const isLoading = useSelector((store : RootState) => store.auth.isLoading);


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
   return <UnAuthorizedRoot/>
  }

  return (
    (children)
  );
};

export default ProtectedRoute;