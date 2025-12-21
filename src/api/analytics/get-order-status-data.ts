import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getOrderStatusData = async()=> {
    try {
        return axiosInstance.get("/analytics/order-status");   
    } catch (error) {
        throw error
    }
}



export const getOrderStatusDataQueryOptions = () => {
    return queryOptions({
        queryKey:['get-order-status-data'],
        queryFn: () => getOrderStatusData()
    })
};


export const useGetOrderStatusData = ( ) => {
    return useQuery({
       ...getOrderStatusDataQueryOptions()
    })
};