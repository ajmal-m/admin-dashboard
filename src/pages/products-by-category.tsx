import { useGetProductByCategoryId } from "@/api/product/get-product-by-category";
import ProductCard from "@/components/product-card";
import type { Product } from "@/type/type";
import { memo } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";

const ProductList = memo(({ cId} : { cId : string}) => {
    const getProductByCategoryMutation = useGetProductByCategoryId({ cId  });

    if(getProductByCategoryMutation.isLoading ){
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
    const products : Product[] = getProductByCategoryMutation?.data?.data?.data ?? [];
    return(
        <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 min-[548px]:grid-cols-3 min-[716px]:grid-cols-4 min-[912px]:grid-cols-5 mt-4">
            {
                products.map((product,i) => (
                    <ProductCard key={i} product={product}/>
                ))
            }
        </div>
    )
});

const ProductByCategoryPage = memo(() => {
    const { cn, cId } = useParams();
    return(
       <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
        <h1  className="text-[24px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px] capitalize">{cn}</h1>
        <ProductList cId={cId as string}/>
       </section>
    )
});

export default ProductByCategoryPage;