import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllOrdersQueryOptions } from "./get-all-orders";

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
    return useMutation({
        mutationFn: (data : OrderUpdateData) => {
            return updateOrderStatus(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getAllOrdersQueryOptions().queryKey });
            onSuccess();
        },
    })
}