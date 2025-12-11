import { memo, useEffect } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import CartContainer from "./cart-container";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { openLogInPopUp } from "@/redux/features/popup";


const LoginButton = () => {
    const isAuthenticated = useSelector((store: RootState) => store.auth.isAuthenticated);
    const email = useSelector((store: RootState) => store.auth.email);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("Authentication update" , isAuthenticated)
    },[isAuthenticated])
    return(
        <>
        {
            isAuthenticated ? (
            <Button className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                self-end px-3 cursor-pointer capitalize`)}>
                {email.split("@")?.[0] ?? email }
            </Button>
            ):(
            <Button className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                    self-end px-3 cursor-pointer capitalize`)}  onClick={() => dispatch(openLogInPopUp())}>
                Login
            </Button>   
            )
        }
        </>
    )
}



const Navbar = memo(() => {
    return(
       <nav
        className="
            h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center 
            justify-between px-10 border-b border-green-700 max-[992px]:px-4 sticky top-0 z-50"
       >
            <Link to={'/'}><img src={Logo} alt="web-app-logo" className="max-[400px]:w-12 max-[400px]:h-12" loading="lazy"/></Link>
           <div className="flex items-center gap-4">
                <LoginButton/>
                <CartContainer/>
           </div>
       </nav>
    )
});

export default Navbar;