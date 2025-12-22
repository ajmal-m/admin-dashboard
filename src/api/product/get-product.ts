import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProducts = async({ search }: { search ?: string })=> {
    try {
        return axiosInstance.get(`/product/all?q=${search}`);
    } catch (error) {
        throw error
    }
}



export const getProductsQueryOption = ({ search }: { search ?: string } ) => {
    return queryOptions({
        queryKey:['get-products', search],
        queryFn: () => getProducts({ search })
    })
}


export const useGetProducts = ( {
    queryConfig ,
    search
} : { queryConfig ?: any ; search ?: string } ) => {
    return useQuery({
       ...getProductsQueryOption({ search }),
       ...queryConfig
    })
}