import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getAverageOrdervalue = async()=> {
    try {
        return axiosInstance.get("/analytics/avg-order-val");   
    } catch (error) {
        throw error
    }
}



export const getAverageOrderValueQueryOptions = () => {
    return queryOptions({
        queryKey:['get-avg-order-val'],
        queryFn: () => getAverageOrdervalue()
    })
};


export const useGetAverageOrderValue = ( ) => {
    return useQuery({
       ...getAverageOrderValueQueryOptions()
    })
};