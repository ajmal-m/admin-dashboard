import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getCustomersCount = async()=> {
    try {
        return axiosInstance.get("/analytics/user-count");   
    } catch (error) {
        throw error
    }
}



export const getCustomersCountQueryOptions = () => {
    return queryOptions({
        queryKey:['get-customers-count'],
        queryFn: () => getCustomersCount()
    })
};


export const useGetCustomersCount = ( ) => {
    return useQuery({
       ...getCustomersCountQueryOptions()
    })
};