import { memo } from "react";
import Logo from '../assets/Grocery_Logo 1.svg';
import NotificationIcon from '../assets/notification.svg';
import ContactIcon from '../assets/contact.svg';
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
        className="h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center justify-between px-10 border-b border-green-700"
       >
            <img src={Logo} alt="web-app-logo"/>
            <ul className="flex items-center gap-[75px] max-sm:hidden">
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
                <img src={NotificationIcon} alt="notification-icon"/>
                <img src={ContactIcon} alt="contact-icon"/>
            </div>
       </nav>
    )
});

export default Navbar;