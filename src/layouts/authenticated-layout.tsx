import { useVerifyUserAuth } from "@/api/auth/verify-auth";
import { updateState } from "@/redux/features/auth";
import { type AppDispatch } from "@/redux/store";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

const AuthenticatedLayout =  memo( () => {
    const verifyUserAuth = useVerifyUserAuth({});
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(verifyUserAuth.data && !verifyUserAuth.isLoading){
            dispatch(updateState({ email : verifyUserAuth.data.data.data.email ?? "User", isAuthenticated:true ,
                id : verifyUserAuth.data?.data?.data?.id ??"" 
            }))
        }
    }, [verifyUserAuth])
    return <Outlet/>;
});

export default AuthenticatedLayout;