import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

type PropType = {
    orderStatuses ?: string[];
    paymentStatuses?: string[];
};

export const getAllOrders = async({ orderStatuses , paymentStatuses } : PropType )=> {
    try {
        let query = `/order?sort=${''}`;
        if(orderStatuses?.length){
            orderStatuses.forEach((orderStatus) => {
                query += `&ods=${orderStatus}`;
            });
        };
        if(paymentStatuses?.length){
            paymentStatuses.forEach((paymentStatus) => (
                query += `&pts=${paymentStatus}`
            ));
        }
        return axiosInstance.get(query);
    } catch (error) {
        throw error;
    }
}



export const getAllOrdersQueryOptions = ({ orderStatuses , paymentStatuses  } : PropType) => {
    return queryOptions({
        queryKey:['get-all-orders', orderStatuses , paymentStatuses],
        queryFn: () => getAllOrders({ orderStatuses , paymentStatuses})
    })
}


export const useGetAllOrders = ({ orderStatuses , paymentStatuses } : PropType) => {
    return useQuery({
       ...getAllOrdersQueryOptions({ orderStatuses , paymentStatuses }),
    })
}