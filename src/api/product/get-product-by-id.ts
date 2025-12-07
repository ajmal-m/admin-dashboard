import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProductById = async(id : string)=> {
    return axiosInstance.get(`/product/${id}`);
}



export const getProductByIdOptions = (id : string) => {
    return queryOptions({
        queryKey:['get-product' , id ],
        queryFn: () => getProductById(id)
    })
}


export const useGetProducts = ( {
    id,
    queryConfig 
} : { id: string;queryConfig ?: any} ) => {
    return useQuery({
       ...getProductByIdOptions(id),
       ...queryConfig
    })
}