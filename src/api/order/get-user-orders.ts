import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

export const getUserOrders = async( id : string )=> {
    return axiosInstance.get(`/order/user/${id}`);
}



export const getUserOrdersQueryOptions = (id : string) => {
    return queryOptions({
        queryKey:['get-user-orders'],
        queryFn: () => getUserOrders(id)
    })
}


export const useGetUserOrders = ({
    id
}:{ id : string ; }) => {
    return useQuery({
       ...getUserOrdersQueryOptions(id),
    })
}