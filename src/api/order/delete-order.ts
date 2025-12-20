import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllOrdersQueryOptions } from "./get-all-orders";

type OrderDeleteData = {
    id: string;
} ;



export const deleteOrder = async(data : OrderDeleteData) => {
    try {
        return await axiosInstance.delete(`/order/${data.id}`);
    } catch (error) {
        throw error;
    }
}


export const useDeleteOrder = ( {
    onSuccess
}:{
    onSuccess: () => void
} ) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data : OrderDeleteData) => {
            return deleteOrder(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getAllOrdersQueryOptions().queryKey });
            onSuccess?.();
        },
    })
}