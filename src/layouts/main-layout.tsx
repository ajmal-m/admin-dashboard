import { memo } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router";
import Footer from "@/components/footer";

const MainLayout = memo(() => {
    return(
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
});

export default MainLayout;