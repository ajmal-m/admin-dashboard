import { useVerifyUserAuth } from "@/api/auth/verify-auth";
import { stopLoading, updateState } from "@/redux/features/auth";
import { type AppDispatch } from "@/redux/store";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

const AuthenticatedLayout =  memo( () => {
    const verifyUserAuth = useVerifyUserAuth({});
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(verifyUserAuth.data && !verifyUserAuth.isLoading){
            dispatch(updateState({ 
                email : verifyUserAuth.data.data.data.email ?? "User", 
                isAuthenticated:true ,
                id : verifyUserAuth.data?.data?.data?.id ??"" ,
                role: verifyUserAuth.data?.data?.data?.role ?? ""
            }));
            dispatch(stopLoading());
        }else if( !verifyUserAuth.data && !verifyUserAuth.isLoading ){
            console.log(verifyUserAuth.data)
            dispatch(updateState({ 
                email : "",
                isAuthenticated:false ,
                id :"",
                role:""
            }));
            dispatch(stopLoading());
        }
    }, [verifyUserAuth])
    return <Outlet/>;
});

export default AuthenticatedLayout;