import { memo } from "react";
import ProductCard from "./product-card";
import { useGetProducts } from "@/api/product/get-product";
import type { Product } from "@/type/type";
import { Bars } from "react-loader-spinner";


const Products = memo(() => {
    const getProductsMutation = useGetProducts({});

    if(getProductsMutation.isLoading){
        return <div className="flex items-center justify-center">
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        </div>
    }

    const products : Product[] = getProductsMutation.data?.data?.data ?? [];

    if(!products.length){
        return(
            <div>
                <h1>No Products Found</h1>
            </div>
        )
    }
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-6 max-[992px]:px-4 max-[992px]:mt-3">
            <h2  className="text-[24px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px] capitalize">All products</h2>
            <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 min-[548px]:grid-cols-3 min-[716px]:grid-cols-4 min-[912px]:grid-cols-5">
                {
                    products.map((product,i) => (
                        <ProductCard key={i} product={product}/>
                    ))
                }
            </div>
        </section>
    )
});

export default Products;