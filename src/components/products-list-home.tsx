import { memo } from "react";
import ProductCard from "./product-card";

const Products = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-[30px] max-[992px]:px-4 max-[992px]:mt-4">
            <h2  className="text-[32px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px]">ALL PRODUCTS</h2>
            <div className="grid gap-4 grid-cols-2 min-[548px]:grid-cols-3 min-[716px]:grid-cols-4 min-[912px]:grid-cols-5">
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