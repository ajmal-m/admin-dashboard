import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

type PropType = {
    search ?: string ; 
    categoryIds ?: string[] ; 
    sort?: string; 
    active ?: string;
    limit ?: number ; 
    page?:number; 
};

export const getProducts = async({ search , categoryIds , sort , active , page , limit}: PropType )=> {
    try {
        let query = `/product/all?q=${search ?? ''}&sort=${sort ?? ''}&active=${active ?? ''}&page=${page ?? 1 }&limit=${limit ?? ''}`;
        if(categoryIds?.length){
            for(let cId of categoryIds){
                query += `&cat=${cId}`;
            }
        }
        return axiosInstance.get(query);
    } catch (error) {
        throw error
    }
}



export const getProductsQueryOption = ({ search , categoryIds , sort , active , page , limit }: PropType ) => {
    return queryOptions({
        queryKey:['get-products', search , categoryIds , sort  , active , page , limit ],
        queryFn: () => getProducts({ search , categoryIds , sort , active , page , limit})
    })
}


export const useGetProducts = ( {
    queryConfig ,
    search,
    categoryIds,
    sort,
    active,
    page,
    limit
} : { queryConfig ?: any} & PropType ) => {
    return useQuery({
       ...getProductsQueryOption({ search , categoryIds , sort , active , page, limit}),
       ...queryConfig
    })
}