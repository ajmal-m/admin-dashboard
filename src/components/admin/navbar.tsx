import { memo } from "react";
import Logo from '../../assets/Grocery_Logo 1.svg';
import { NavLink , Link } from "react-router";

const NavLinks = [
    {
        name:"Products",
        url:"/admin/products"
    },
    {
        name:"Categories",
        url:"/admin/categories"
    },
    {
        name:"Orders",
        url:"/admin/orders"
    }
]


const Navbar = memo(() => {
    return(
       <nav
            className="
                h-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] flex items-center 
                justify-between px-10 border-b border-green-700 max-[992px]:px-4 sticky top-0 z-50
            "
       >
            <Link to={'/admin'}>
                <img src={Logo} alt="web-app-logo" className="max-[400px]:w-12 max-[400px]:h-12" loading="lazy"/>
            </Link>
           <ul className="flex items-center gap-4">
            {
                NavLinks.map((link) => (
                    <li key={link.name}  className="text-[16px] font-medium font-mont">
                        <NavLink 
                            to={link.url}
                            className={
                                ({ isActive  }) => (
                                    isActive ? 
                                        `relative after:content-[''] after:w-full after:bg-green-800 after:h-1 after:absolute after:top-full
                                        after:text-green-800 after:left-0 after:rounded after:transition-all after:duration-300 after:ease-in
                                        `
                                    :""
                                )
                            }
                        >
                            {link.name}
                        </NavLink>
                    </li>
                ))
            }
           </ul>
       </nav>
    )
});

export default Navbar;