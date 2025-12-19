import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getOrderById = async( id : string )=> {
    return axiosInstance.get(`/order/${id}`);
}



export const getOrderByIdQueryOptions = (id : string) => {
    return queryOptions({
        queryKey:['get-order-by-id'],
        queryFn: () => getOrderById(id)
    })
}


export const useGetOrderById = ({
    id
}:{ id : string ; }) => {
    return useQuery({
       ...getOrderByIdQueryOptions(id),
    })
}