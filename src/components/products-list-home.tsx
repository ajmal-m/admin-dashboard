import { memo } from "react";
import ProductCard from "./product-card";

const Products = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-[30px] max-[400px]:px-4 max-[400px]:mt-4">
            <h2  className="text-[32px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px]">ALL PRODUCTS</h2>
            <div className="grid max-[400px]:grid-cols-2  max-[400px]:gap-4">
                {
                    new Array(20).fill(0).map((_,i) => (
                        <ProductCard key={i}/>
                    ))
                }
            </div>
        </section>
    )
});

export default Products;