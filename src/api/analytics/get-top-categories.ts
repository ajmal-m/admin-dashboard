import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getTopCategories = async()=> {
    try {
        return axiosInstance.get("/analytics/top-categories");   
    } catch (error) {
        throw error
    }
}



export const getTopCategoriesQueryOptions = () => {
    return queryOptions({
        queryKey:['get-top-categories'],
        queryFn: () => getTopCategories()
    })
};


export const useGetTopCategories = ( ) => {
    return useQuery({
       ...getTopCategoriesQueryOptions()
    })
};