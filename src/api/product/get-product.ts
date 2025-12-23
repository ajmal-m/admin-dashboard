import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProducts = async({ search , categoryIds , sort , active }: { search ?: string ; categoryIds ?: string[] ; sort: string; active : string;  })=> {
    try {
        let query = `/product/all?q=${search ?? ''}&sort=${sort}&active=${active}`;
        if(categoryIds?.length){
            for(let cId of categoryIds){
                query += `&cat=${cId}`;
            }
        }
        return axiosInstance.get(query);
    } catch (error) {
        throw error
    }
}



export const getProductsQueryOption = ({ search , categoryIds , sort , active }: { search ?: string ; categoryIds ?: string[];sort:  string ;active : string;  } ) => {
    return queryOptions({
        queryKey:['get-products', search , categoryIds , sort  , active],
        queryFn: () => getProducts({ search , categoryIds , sort , active})
    })
}


export const useGetProducts = ( {
    queryConfig ,
    search,
    categoryIds,
    sort,
    active
} : { queryConfig ?: any ; search ?: string; categoryIds ?: string[] ; sort:  string ; active : string; } ) => {
    return useQuery({
       ...getProductsQueryOption({ search , categoryIds , sort , active }),
       ...queryConfig
    })
}