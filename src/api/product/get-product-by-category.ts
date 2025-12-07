import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProductsByCategoryId = async({ cId }: { cId : string})=> {
    return axiosInstance.get(`product/product-by-category/${cId}`);
}



export const getProductByCategoryIdQueryOptions = ({  cId }: {  cId : string }) => {
    return queryOptions({
        queryKey:['get-product-by-category', cId],
        queryFn: () => getProductsByCategoryId({ cId})
    })
}


export const useGetProductByCategoryId = ( {
    cId,
    queryConfig 
} : { queryConfig ?: any;  cId: string; } ) => {
    return useQuery({
       ...getProductByCategoryIdQueryOptions({ cId}),
       ...queryConfig
    })
}