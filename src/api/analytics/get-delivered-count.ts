import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getDeliveredOrderCOunt = async()=> {
    try {
        return axiosInstance.get("/analytics/delivered-order-count");   
    } catch (error) {
        throw error
    }
}



export const getDeliveredOrderCountQueryOptions = () => {
    return queryOptions({
        queryKey:['get-delivered-order-count'],
        queryFn: () => getDeliveredOrderCOunt()
    })
};


export const useGetDeliveredOrderCount = ( ) => {
    return useQuery({
       ...getDeliveredOrderCountQueryOptions()
    })
};