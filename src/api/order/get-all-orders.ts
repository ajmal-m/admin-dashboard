import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

type PropType = {
    orderStatuses ?: string[];
    paymentStatuses?: string[];
    limit ?: number;
    page ?: number;
};

export const getAllOrders = async({ orderStatuses , paymentStatuses , page , limit} : PropType )=> {
    try {
        let query = `/order?sort=${''}&page=${page}&limit=${limit}`;
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



export const getAllOrdersQueryOptions = ({ orderStatuses , paymentStatuses , page , limit } : PropType) => {
    return queryOptions({
        queryKey:['get-all-orders', orderStatuses , paymentStatuses , page , limit],
        queryFn: () => getAllOrders({ orderStatuses , paymentStatuses , page , limit})
    })
}


export const useGetAllOrders = ({ orderStatuses , paymentStatuses , page , limit} : PropType) => {
    return useQuery({
       ...getAllOrdersQueryOptions({ orderStatuses , paymentStatuses , page, limit }),
    })
}