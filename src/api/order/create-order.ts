import type { Order } from "@/type/type";
import axiosInstance from "../api";
import { useMutation  } from "@tanstack/react-query";
import { useSearchParams } from "react-router";




export const createOrder = async(data : Order) => {
    try {
        return await axiosInstance.post('/order/create',{
            order: data
        });
    } catch (error) {
        throw error
    }
}


export const useCreateOrder = ({
    onSuccess
}: {
    onSuccess: () => void
}) => {
    const [ params, setParams ] = useSearchParams();
    return useMutation({
        mutationFn: (data : Order ) => {
            return createOrder(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess(data) {
            onSuccess();
            const orderId = data.data.data?._id;
            params.set("id", orderId);
            setParams(params);
        },
    })
}