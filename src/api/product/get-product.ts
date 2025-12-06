import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProducts = async()=> {
    return axiosInstance.get("/product/all");
}



export const getProductsQueryOption = () => {
    return queryOptions({
        queryKey:['get-products'],
        queryFn: () => getProducts()
    })
}


export const useGetProducts = ( {
    queryConfig 
} : { queryConfig ?: any} ) => {
    return useQuery({
       ...getProductsQueryOption(),
       ...queryConfig
    })
}