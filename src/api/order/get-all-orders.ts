import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getAllOrders = async( )=> {
    return axiosInstance.get(`/order`);
}



export const getAllOrdersQueryOptions = () => {
    return queryOptions({
        queryKey:['get-all-orders'],
        queryFn: () => getAllOrders()
    })
}


export const useGetAllOrders = () => {
    return useQuery({
       ...getAllOrdersQueryOptions(),
    })
}