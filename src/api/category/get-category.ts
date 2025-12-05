import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getCategories = async()=> {
    return axiosInstance.get("/category/all");
}



export const getCategoryQueryOptions = () => {
    return queryOptions({
        queryKey:['get-category'],
        queryFn: () => getCategories()
    })
}


export const useGetCategories = ( {
    queryConfig 
} : { queryConfig ?: any} ) => {
    return useQuery({
       ...getCategoryQueryOptions(),
       ...queryConfig
    })
}