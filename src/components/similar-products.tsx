import { memo } from "react";
import ProductCard from "./product-card";
import type { Product } from "@/type/type";
import { useGetSimilarProducts } from "@/api/product/get-similar-products";
import ProductCardSkelton from "./skeltons/product-card";


const ProductList = memo(({ product }: { product: Product}) => {

    const getSimilarProductMutation = useGetSimilarProducts({ cId: product.category._id as string, pId: product._id});

    if(getSimilarProductMutation.isLoading ){
        return(
            <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 min-[548px]:grid-cols-3 min-[716px]:grid-cols-4 min-[912px]:grid-cols-5 mt-6">
                {
                    new Array(10).fill(-1).map((_,i) => (
                       <ProductCardSkelton key={i} />
                    ))
                }
            </div>
        )
    }

    const similarProducts : Product[] = getSimilarProductMutation?.data?.data?.data ?? [];
    return(
        <div className="grid gap-4 grid-cols-1 min-[360px]:grid-cols-2 min-[548px]:grid-cols-3 min-[716px]:grid-cols-4 min-[912px]:grid-cols-5 mt-6">
            {
                similarProducts.map((pItem) => (
                    <ProductCard key={pItem._id} product={pItem}/>
                ))
            }
        </div>
    )
});


const SimilarProducts = memo(({ product }: { product: Product}) => {
    return(
        <section className="mt-6">
             <h2  className="text-[24px] font-semibold font-mont max-[400px]:text-[24px] capitalize">People also bought</h2>
             <ProductList product={product}/>
        </section>
    )
});

export default SimilarProducts;