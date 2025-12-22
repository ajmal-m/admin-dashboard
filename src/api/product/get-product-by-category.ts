import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";


export const getProductsByCategoryId = async({ cId  , sort , searchQuery }: { cId : string ; sort : null | string; searchQuery : string })=> {
    return axiosInstance.get(`product/product-by-category/${cId}?sort=${sort}&q=${searchQuery}`);
}



export const getProductByCategoryIdQueryOptions = ({  cId , sort , searchQuery }: {  cId : string ; sort: null | string ; searchQuery : string }) => {
    return queryOptions({
        queryKey:['get-product-by-category', cId , sort, searchQuery ],
        queryFn: () => getProductsByCategoryId({ cId , sort , searchQuery})
    })
}


export const useGetProductByCategoryId = ( {
    cId,
    queryConfig ,
    sort,
    searchQuery
} : { queryConfig ?: any;  cId: string; sort: null | string ; searchQuery : string } ) => {
    return useQuery({
       ...getProductByCategoryIdQueryOptions({ cId , sort , searchQuery}),
       ...queryConfig
    })
}