import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProducts = async({ search , categoryIds }: { search ?: string ; categoryIds ?: string[] })=> {
    try {
        let query = `/product/all?q=${search}`;
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



export const getProductsQueryOption = ({ search , categoryIds }: { search ?: string ; categoryIds ?: string[] } ) => {
    return queryOptions({
        queryKey:['get-products', search , categoryIds],
        queryFn: () => getProducts({ search , categoryIds })
    })
}


export const useGetProducts = ( {
    queryConfig ,
    search,
    categoryIds
} : { queryConfig ?: any ; search ?: string; categoryIds ?: string[] } ) => {
    return useQuery({
       ...getProductsQueryOption({ search , categoryIds }),
       ...queryConfig
    })
}