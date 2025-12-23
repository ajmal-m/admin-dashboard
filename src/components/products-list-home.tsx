import { memo, useEffect, useRef } from "react";
import ProductCard from "./product-card";
import type { Product } from "@/type/type";
import { Bars, Oval } from "react-loader-spinner";
import { useGetProductHome } from "@/api/product/get-products-on-home";
import { Button } from "./ui/button";


const ObserverElement = memo((
    { hasNext , gotToPage }:
    {
        hasNext: boolean;
        gotToPage:() => void
    }
) => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
           if(entry.isIntersecting && hasNext){
            gotToPage?.();
           }
        });
        observer.observe(ref.current);
        return () => observer.disconnect();
    },[ref.current])
    return(
        <div ref={ref}></div>
    )
});


const Products = memo(() => {
    const getProductMutation = useGetProductHome();

    if(getProductMutation.isLoading){
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

    const products : Product[] = getProductMutation.data?.pages?.flatMap((arr) => arr.data ) ?? [];

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
            {
                 getProductMutation.isFetchingNextPage && (
                    <div className="flex justify-center items-center">
                        <span className="tetx-[16px] font-mont font-medium">Loading...</span>
                        <Oval
                            visible={true}
                            height="20"
                            width="20"
                            color="#4fa94d"
                            strokeWidth='2'
                        />
                    </div>
                 )
            }
            <ObserverElement hasNext={getProductMutation.hasNextPage} gotToPage={ () => getProductMutation.fetchNextPage() }  />
        </section>
    )
});

export default Products;