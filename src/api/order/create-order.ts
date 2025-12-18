import type { Order } from "@/type/type";
import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";




export const createOrder = async(data : Order) => {
    try {
        return await axiosInstance.post('/order/create',{
            order: data
        });
    } catch (error) {
        throw error
    }
}


export const useCreateOrder = () => {
    return useMutation({
        mutationFn: (data : Order ) => {
            return createOrder(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess(data) {
            console.log(data);
        },
    })
}