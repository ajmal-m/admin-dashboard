import { memo } from "react";
import Navbar from "../components/admin/navbar";
import { Outlet } from "react-router";

const AdminLayout = memo(() => {
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
});

export default AdminLayout;