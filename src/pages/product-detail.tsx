import { useGetProductsById } from "@/api/product/get-product-by-id";
import SimilarProducts from "@/components/similar-products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/type/type";
import { memo } from "react";
import {  Oval } from "react-loader-spinner";
import { useParams } from "react-router";

const ProductDetail = memo(() => {
    const {pId} = useParams();
    const getProductByIdMutation = useGetProductsById({ id : pId as string});
    if(getProductByIdMutation.isLoading){
         return <div className="flex justify-center min-h-screen pt-5">
             <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                strokeWidth='2'
                animationDuration='1.5'
            />
        </div>
    }

    const product : Product = getProductByIdMutation?.data?.data?.data ?? {} as Product;
    
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <div className="flex items-center justify-center gap-6 max-[800px]:flex-col">
                <img 
                    src={product.image.secure_url}
                    alt={product.name}
                    className="w-[480px] h-[480px]"
                />
                <div className="flex flex-col self-start pt-[60px] gap-4 max-[800px]:self-center max-[800px]:pt-0 max-[800px]:w-full max-[800px]:gap-1">
                    <h2 className="text-[24px] text-black font-mont font-medium capitalize">{product.name}</h2>
                    <div className="flex items-center justify-between gap-10">
                        <p className="text-[24px] text-[black] font-mont font-bold">₹ {product.price}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[#2B2B2B] font-mont font-medium">MRP <span className="line-through">{ Math.floor(product.price*1.1)}</span></span>
                            <Badge className={cn("bg-blue-500 text-white px-2 py-1 rounded font-month font-medium")}>10% off</Badge>
                        </div>
                    </div>
                    <button className="bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                    max-w-50 self-end px-3 cursor-pointer capitalize">
                        Add To cart
                    </button>
                </div>
            </div>
            <SimilarProducts  product={product}/>
        </section>
    )
});

export default ProductDetail;