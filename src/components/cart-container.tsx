import { memo, useState } from "react";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import Drawer from "./cart-item-list";

const CartContainer= memo(() => {
    const [open, setOpen] = useState(false);
    const {productCount} = useSelector((state : RootState) => state.cart);
    return(
        <div className="flex items-center gap-4 relative">
            {
                productCount > 0 && (<Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-[-9px] right-[-37%] bg-[#0B6434]">{productCount}</Badge>)
            }
            <svg xmlns="http://www.w3.org/2000/svg" width="24" 
                height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
                stroke-linecap="round" stroke-linejoin="round" 
                className="lucide lucide-shopping-cart-icon lucide-shopping-cart cursor-pointer"
                onClick={() => setOpen(true)}
            >
            <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>
            <Drawer isOpen={open} onClose={() => setOpen(false)}/>
        </div>
    )
});

export default CartContainer;