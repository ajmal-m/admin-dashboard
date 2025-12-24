import axiosInstance from "../api";
import { useQuery , queryOptions } from "@tanstack/react-query";

type PropType = {
    orderStatuses ?: string[];
    paymentStatuses?: string[];
    limit ?: number;
    page ?: number;
    sort ?: string;
};

export const getAllOrders = async({ orderStatuses , paymentStatuses , page , limit, sort } : PropType )=> {
    try {
        let query = `/order?sort=${sort}&page=${page}&limit=${limit}`;
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



export const getAllOrdersQueryOptions = ({ orderStatuses , paymentStatuses , page , limit , sort } : PropType) => {
    return queryOptions({
        queryKey:['get-all-orders', orderStatuses , paymentStatuses , page , limit , sort ],
        queryFn: () => getAllOrders({ orderStatuses , paymentStatuses , page , limit , sort})
    })
}


export const useGetAllOrders = ({ orderStatuses , paymentStatuses , page , limit , sort } : PropType) => {
    return useQuery({
       ...getAllOrdersQueryOptions({ orderStatuses , paymentStatuses , page, limit  , sort }),
    })
}