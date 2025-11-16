import { memo } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import { NavLink } from "react-router-dom";



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
        url:"/product"
    },
     {
        name:"Contact",
        url:"/contact"
    },
    
];

const Navbar = memo(() => {
    return(
       <nav
        className="h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center justify-between px-10 border-b border-green-700 max-[400px]:px-3 sticky top-0 z-50"
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
            <div className="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </div>
       </nav>
    )
});

export default Navbar;