import { memo } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import CartContainer from "./cart-container";
import { Link } from "react-router";
import LoginPopup from "./auth/login-pop-up";



const Navbar = memo(() => {
    return(
       <nav
        className="
            h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center 
            justify-between px-10 border-b border-green-700 max-[992px]:px-4 sticky top-0 z-50"
       >
            <Link to={'/'}><img src={Logo} alt="web-app-logo" className="max-[400px]:w-12 max-[400px]:h-12" loading="lazy"/></Link>
           <div className="flex items-center gap-4">
                <LoginPopup/>
                <CartContainer/>
           </div>
       </nav>
    )
});

export default Navbar;