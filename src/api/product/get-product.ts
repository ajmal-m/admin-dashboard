import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getProducts = async({ search , categoryIds , sort }: { search ?: string ; categoryIds ?: string[] ; sort: string  })=> {
    try {
        let query = `/product/all?q=${search ?? ''}&sort=${sort}`;
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



export const getProductsQueryOption = ({ search , categoryIds , sort }: { search ?: string ; categoryIds ?: string[];sort:  string  } ) => {
    return queryOptions({
        queryKey:['get-products', search , categoryIds , sort ],
        queryFn: () => getProducts({ search , categoryIds , sort })
    })
}


export const useGetProducts = ( {
    queryConfig ,
    search,
    categoryIds,
    sort
} : { queryConfig ?: any ; search ?: string; categoryIds ?: string[] ; sort:  string } ) => {
    return useQuery({
       ...getProductsQueryOption({ search , categoryIds , sort }),
       ...queryConfig
    })
}