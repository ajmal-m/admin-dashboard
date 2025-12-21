import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getLastSevenDaysSales = async()=> {
    try {
        return axiosInstance.get("/analytics/last-week-days-sales");   
    } catch (error) {
        throw error
    }
}



export const getLastSevenDaysSalesQueryOptions = () => {
    return queryOptions({
        queryKey:['get-last-seven-days-sales'],
        queryFn: () => getLastSevenDaysSales()
    })
};


export const useGetLastSevenDaysSales = ( ) => {
    return useQuery({
       ...getLastSevenDaysSalesQueryOptions()
    })
};