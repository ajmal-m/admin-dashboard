import { memo } from "react";
import Navbar from "../components/admin/navbar";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { CHECK_ADMIN_ACCESS } from "@/utils/utils";
import { Oval } from "react-loader-spinner";

const AdminLayout = memo(() => {
    const role = useSelector((store : RootState) => store.auth.role);
    const isAdminAccess = CHECK_ADMIN_ACCESS({ role });
    const isLoadingAuth = useSelector((store : RootState) => store.auth.isLoading);

    if(isLoadingAuth){
        return(
            <div className="flex justify-center items-center min-h-screen">
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
    if(!isAdminAccess){
        return(
            <div className="flex justify-center items-center min-h-screen">
                <h1 className="text-[16px] font-medium font-mont">NO ACCESS</h1>
            </div>
        )
    }
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
});

export default AdminLayout;