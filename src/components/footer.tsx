import { memo } from "react";

const Footer = memo(() => {
    return(
       <footer className="min-h-[100px] bg-[#C6EAD7] dark:bg-[#C6EAD7] mt-[30px]">
        <div className="py-[30px] px-10 flex items-center justify-center flex-wrap gap-10 max-[600px]:gap-4 max-[600px]:py-2 max-[600px]:px-4 max-[600px]:justify-start">
            <ul className="font-mont text-[14px]">
                <li className="text-[16px] font-medium font-mont">ABOUT</li>
                <li>Who we are?</li>
                <li>Privacy Policy</li>
            </ul>

             <ul className="font-mont text-[14px]">
                <li className="text-[16px] font-medium font-mont">HELP</li>
                <li>Support</li>
                <li>Help Center</li>
            </ul>

             <ul className="font-mont text-[14px]">
                <li className="text-[16px] font-medium font-mont">CONTACT</li>
                <li>Terms & Condition </li>
                <li>Return & Exchange Policy</li>
            </ul>

             <ul className="font-mont text-[14px]">
                <li className="text-[16px] font-medium font-mont">FOLLOW US</li>
                <li>Facebook?</li>
                <li>Instagram</li>
            </ul>
        </div>
       </footer>
    )
});

export default Footer;