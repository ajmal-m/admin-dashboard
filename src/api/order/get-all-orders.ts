import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

type PropType = {
    orderStatuses ?: string[]
};

export const getAllOrders = async({ orderStatuses } : PropType )=> {
    try {
        let query = `/order?sort=${''}`;
        if(orderStatuses?.length){
            orderStatuses.forEach((orderStatus) => {
                query += `&ods=${orderStatus}`;
            });
        }
        return axiosInstance.get(query);
    } catch (error) {
        throw error;
    }
}



export const getAllOrdersQueryOptions = ({ orderStatuses  } : PropType) => {
    return queryOptions({
        queryKey:['get-all-orders', orderStatuses],
        queryFn: () => getAllOrders({ orderStatuses })
    })
}


export const useGetAllOrders = ({ orderStatuses } : PropType) => {
    return useQuery({
       ...getAllOrdersQueryOptions({ orderStatuses }),
    })
}