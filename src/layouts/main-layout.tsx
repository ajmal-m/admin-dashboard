import { memo } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router";
import Footer from "@/components/footer";
import ScrollToTop from "@/utils/scrollTop";

const MainLayout = memo(() => {
    return(
        <>
            <ScrollToTop/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
});

export default MainLayout;