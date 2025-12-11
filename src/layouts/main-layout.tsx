import { memo } from "react";
import Navbar from "../components/navbar";
import { Outlet } from "react-router";
import Footer from "@/components/footer";
import ScrollToTop from "@/utils/scrollTop";
import LoginPopup from "@/components/auth/login-pop-up";
import CheckOutPopUp from "@/components/checkout-modal";

const MainLayout = memo(() => {
    return(
        <>
            <ScrollToTop/>
            <Navbar/>
            <Outlet/>
            <Footer/>
            {/* PopUps */}
            <LoginPopup/>
            <CheckOutPopUp/>
        </>
    )
});

export default MainLayout;