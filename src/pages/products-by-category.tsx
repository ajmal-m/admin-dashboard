import { useGetProductByCategoryId } from "@/api/product/get-product-by-category";
import ProductCard from "@/components/product-card";
import { PRODUCT_SORT_OPTIONS } from "@/const/product-sort-options";
import { cn } from "@/lib/utils";
import type { Product } from "@/type/type";
import { useDebouncer } from "@/utils/utils";
import React, { memo, useCallback, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useParams } from "react-router";

const ProductList = memo(({ cId , sort , searchQuery } : { cId : string; sort :  string ; searchQuery : string  }) => {
    const getProductByCategoryMutation = useGetProductByCategoryId({ cId , sort , searchQuery });

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

    if(products.length === 0){
        return(
            <h1 className="text-[16px] font-mont font-medium text-center mt-6">No Products Found</h1>
        )
    }
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


const SortSelector = memo((
    { handleSort , sort } : { handleSort : (e : React.ChangeEvent<HTMLSelectElement>) => void; sort: string }
) => {
    return(
         <select 
            name="sort" id="sort"
            className={cn(
                "rounded border border-green-900 font-mont",
                "bg-green-800 text-white cursor-pointer px-4 py-2 text-[12px]"
            )}
            onChange={handleSort}
            value={sort}
        >
            <option value="">SELECT SORT</option>
            {
                PRODUCT_SORT_OPTIONS.map((option) => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
});

const SearchInput = memo((
    { search, changeSearch } : { 
        search : string;
        changeSearch: (e : React.ChangeEvent<HTMLInputElement>) => void;
     }
) => {
    return(
        <input 
            type="search" name="search" id="search" 
            className={
                cn(
                    "px-4 py-2 border border-green-900",
                    "rounded font-mont font-medium text-[12px]"
                )
            }
            placeholder="Search Products"
            value={search}
            onChange={changeSearch}
        />
    )
});

const ProductByCategoryPage = memo(() => {
    const { cne , cId } = useParams();
    const [sort, setSort] = useState<string>('');
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebouncer(search);
    
    const handleSort = useCallback((e : React.ChangeEvent<HTMLSelectElement>) => {
       setSort(e.target.value);
    },[]);

    const changeSearch = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    },[]);


    return(
       <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
        <div className="flex justify-between items-center">
            <h1  className="text-[24px] font-semibold font-mont max-[400px]:text-[24px] capitalize">{cne}</h1>
            <div className="flex items-center gap-2">
                <SearchInput search={search} changeSearch={changeSearch}/>
                <SortSelector sort={sort} handleSort={handleSort}/>
            </div>
        </div>
        <ProductList cId={cId as string} sort={sort} searchQuery={debouncedSearch}/>
       </section>
    )
});

export default ProductByCategoryPage;