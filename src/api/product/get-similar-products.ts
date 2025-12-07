import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getSimilarProducts = async({ pId, cId }: { pId : string; cId : string})=> {
    return axiosInstance.get(`/product/similar-products/${pId}/${cId}`);
}



export const getSimilarProductQueryOptions = ({ pId, cId }: { pId : string; cId : string }) => {
    return queryOptions({
        queryKey:['get-similar-products', pId, cId],
        queryFn: () => getSimilarProducts({ cId, pId})
    })
}


export const useGetSimilarProducts = ( {
    cId,
    pId,
    queryConfig 
} : { queryConfig ?: any; pId : string; cId: string; } ) => {
    return useQuery({
       ...getSimilarProductQueryOptions({ pId, cId}),
       ...queryConfig
    })
}