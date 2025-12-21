import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getTopProducts = async()=> {
    try {
        return axiosInstance.get("/analytics/top-products");   
    } catch (error) {
        throw error
    }
}



export const getTopProductQueryOptions = () => {
    return queryOptions({
        queryKey:['get-top-products'],
        queryFn: () => getTopProducts()
    })
};


export const useGetTopProducts = ( ) => {
    return useQuery({
       ...getTopProductQueryOptions()
    })
};