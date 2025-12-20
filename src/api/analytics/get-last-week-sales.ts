import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getLastWeekSales = async()=> {
    try {
        return axiosInstance.get("/analytics/sales-at-last-week");   
    } catch (error) {
        throw error
    }
}



export const getLastWeekSalesQueryOptions = () => {
    return queryOptions({
        queryKey:['get-last-week-sales'],
        queryFn: () => getLastWeekSales()
    })
};


export const useGetLastWeekSales = ( ) => {
    return useQuery({
       ...getLastWeekSalesQueryOptions()
    })
};