import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllOrdersQueryOptions } from "./get-all-orders";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

type OrderUpdateData = {
    id: string;
    orderStatus:string;
    paymentStatus: string;
} ;



export const updateOrderStatus = async(data : OrderUpdateData) => {
    try {
        return await axiosInstance.put(`/order/update-order`,data);
    } catch (error) {
        throw error;
    }
}


export const useOrderStatusUpdate = ({ onSuccess }: { onSuccess : () => void }) => {
    const queryClient = useQueryClient();
    const orderStatuses = useSelector((store : RootState) => store.orderTableFilters.orderStatus);
    const paymentStatuses = useSelector((store : RootState) => store.orderTableFilters.paymentStatus);

    return useMutation({
        mutationFn: (data : OrderUpdateData) => {
            return updateOrderStatus(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getAllOrdersQueryOptions({ orderStatuses ,paymentStatuses }).queryKey });
            onSuccess();
        },
    })
}