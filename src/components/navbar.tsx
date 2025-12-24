import { memo, useCallback, useContext } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import CartContainer from "./cart-container";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { openLogInPopUp } from "@/redux/features/popup";
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { updateState } from "@/redux/features/auth";
import { CHECK_ADMIN_ACCESS } from "@/utils/utils";
import { useTheme } from "@/context/theme-context";


const LoginButton = () => {
    const isAuthenticated = useSelector((store: RootState) => store.auth.isAuthenticated);
    const email = useSelector((store: RootState) => store.auth.email);
    const role = useSelector((store: RootState) => store.auth.role);
    const isAdminAccess = CHECK_ADMIN_ACCESS({ role });

    const dispatch = useDispatch<AppDispatch>();
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("token");
        dispatch(updateState({ isAuthenticated: false, email:"" , token:"" , id:"" }))
    },[])
    return(
        <>
        {
            isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button 
                            className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                            self-end px-3 cursor-pointer capitalize`)}
                        >
                            {email.split("@")?.[0] ?? email }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                        <Link to={'/orders'}>
                            <Button
                                className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                                self-end px-3 cursor-pointer capitalize w-full`)}
                            >
                                Orders
                            </Button>
                        </Link>
                        {
                            isAdminAccess && (
                                <Link target="_blank" to={'/admin'}>
                                    <Button
                                        className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                                        self-end px-3 cursor-pointer capitalize w-full`)}
                                    >
                                        Admin
                                    </Button>
                                </Link>
                            )
                        }
                        <Button
                            className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                            self-end px-3 cursor-pointer capitalize w-full`)}
                            onClick={handleLogOut}
                        >
                            Logout
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            ):(
                <Button className={cn(`bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                        self-end px-3 cursor-pointer capitalize`)}  onClick={() => dispatch(openLogInPopUp())}>
                    Login
                </Button>   
            )
        }
        </>
    )
};

const MoonIcon = memo(() => {
    return(
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
        className="lucide lucide-moon-icon lucide-moon">
            <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
        </svg>
    )
});

const SunIcon = memo(() => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
         className="lucide lucide-sun-medium-icon lucide-sun-medium"><circle cx="12" cy="12" r="4"/>
         <path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/>
        <path d="m18.364 5.636-.707.707"/><path d="m6.343 17.657-.707.707"/>
        <path d="m5.636 5.636.707.707"/><path d="m17.657 17.657.707.707"/></svg>
    )
});


export const ThemeToggler = memo(() => {
    const {theme , toggle  } = useTheme();
    return(
        <button
            className={
                cn(
                    "p-2 border border-transparent hover:border-green-900",
                    "rounded", "cursor-pointer"
                )
            }
            onClick={toggle}
        >
            {
                theme === "dark" ? <SunIcon/> : <MoonIcon/>
            }
        </button>
    )
});


const Navbar = memo(() => {
    return(
       <nav
        className="
            h-20 flex items-center
            justify-between px-10 border-b border-green-700 max-[992px]:px-4 sticky top-0 z-50 bg-light dark:bg-bluedark text-black dark:text-white"
       >
            <Link to={'/'}><img src={Logo} alt="web-app-logo" className="max-[400px]:w-12 max-[400px]:h-12" loading="lazy"/></Link>
           <div className="flex items-center gap-4">
                <LoginButton/>
                <CartContainer/>
                <ThemeToggler/>
           </div>
       </nav>
    )
});

export default Navbar;