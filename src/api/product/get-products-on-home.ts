import { useInfiniteQuery , infiniteQueryOptions } from "@tanstack/react-query";
import axiosInstance from "../api";
import type { Product } from "@/type/type";

type ResponseType = {
    data: Product[];
    count: number;
    pageCount:number;
    currentPage:number;
}

export const fetchProducts = async ({
    page, limit
 }: { page: number ; limit : number }) => {
    try {
        const {data} = await axiosInstance.get(`/product/all?page=${page}&limit=${limit}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getProductOnHomePageQueryOptions =(
) => {
    return infiniteQueryOptions<ResponseType, Error, ResponseType ,string[],number>({
        queryKey : ['get-product-home-page'],
        queryFn: ({ pageParam = 1  }) => fetchProducts({ page : pageParam , limit:10}),
        getNextPageParam:(lastPage)=>{
            const data = lastPage;
            if(!data) return undefined;
            if(data?.currentPage < data?.pageCount){
                return (data.currentPage+1);
            }else if(data?.currentPage === data.pageCount){
                return undefined;
            }
        },
        initialPageParam:1,
    });
};


export const useGetProductHome = () => {
    return useInfiniteQuery({
        ...getProductOnHomePageQueryOptions()
    });
};