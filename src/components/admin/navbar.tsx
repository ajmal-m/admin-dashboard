import { memo } from "react";
import Logo from '../../assets/Grocery_Logo 1.svg';
import { Link } from "react-router";

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
                        <Link to={link.url}>
                            {link.name}
                        </Link>
                    </li>
                ))
            }
           </ul>
       </nav>
    )
});

export default Navbar;