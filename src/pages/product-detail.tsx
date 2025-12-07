import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { useParams } from "react-router";

const ProductDetail = memo(() => {
    const params = useParams();
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-3">
            <div className="flex items-center gap-4">
                <img 
                    src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=480,h=480/da/cms-assets/cms/product/321082da-934f-48a8-b340-f42ba20136a7.jpg" 
                    alt={""}
                    className="w-[480px] h-[480px]"
                />
                <div className="flex flex-col self-start pt-[60px] gap-4">
                    <h2 className="text-[24px] text-black font-mont font-medium capitalize">YODLEY Millet Masala Munchies Namkeen Snacks</h2>
                    <div className="flex items-center justify-between">
                        <p className="text-[24px] text-[black] font-mont font-bold mr-3">₹ 150</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[#2B2B2B] font-mont font-medium">MRP <span className="line-through">200</span></span>
                            <Badge className={cn("bg-blue-500 text-white px-2 py-1 rounded font-month font-medium")}>10% off</Badge>
                        </div>
                    </div>
                    <button className="bg-[#318616] text-white rounded py-2 font-mont font-medium max-w-50 self-end px-3 cursor-pointer capitalize">Add To cart</button>
                </div>
            </div>
        </section>
    )
});

export default ProductDetail;