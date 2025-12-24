import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getAllOrdersQueryOptions } from "./get-all-orders";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

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
    const orderStatuses = useSelector((store : RootState) => store.orderTableFilters.orderStatus);
    const paymentStatuses = useSelector((store : RootState) => store.orderTableFilters.paymentStatus);
    const page = useSelector((store : RootState) => store.orderTableFilters.page);
    const limit = useSelector((store : RootState) => store.orderTableFilters.limit);
    const sort = useSelector((store : RootState) => store.orderTableFilters.sort);



    return useMutation({
        mutationFn: (data : OrderDeleteData) => {
            return deleteOrder(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getAllOrdersQueryOptions({ orderStatuses , paymentStatuses , page, limit , sort }).queryKey });
            onSuccess?.();
        },
    })
}