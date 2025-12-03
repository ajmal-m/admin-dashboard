import { memo } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import { NavLink } from "react-router";
import { Badge } from "./ui/badge";
import CartContainer from "./cart-container";



const NavLinks = [
    {
        name:"Home",
        url:"/"
    },
    {
        name:"About",
        url:"/about"
    },
    {
        name:"Service",
        url:"/service"
    },
    {
        name:"Product",
        url:"/products"
    },
     {
        name:"Contact",
        url:"/contact"
    },
    
];

const Navbar = memo(() => {
    return(
       <nav
        className="h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center justify-between px-10 border-b border-green-700 max-[992px]:px-4 sticky top-0 z-50"
       >
            <img src={Logo} alt="web-app-logo" className="max-[400px]:w-12 max-[400px]:h-12" loading="lazy"/>
            <ul className="flex items-center gap-[75px] max-[996px]:gap-9 max-[850px]:hidden">
                {
                    NavLinks.map((link , i) => (
                        <li key={i}
                            className="text-[20px] font-medium font-mont"
                        >
                           <NavLink 
                                to={link.url}  
                                className={({ isActive }) =>
                                    isActive ? "text-[#0B6434]" : "text-[#000000]"
                                }
                            >
                                {link.name}
                           </NavLink>
                        </li>
                    ))
                }
            </ul>
           <CartContainer/>
       </nav>
    )
});

export default Navbar;