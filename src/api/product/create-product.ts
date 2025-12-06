import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";

type productData = FormData;



export const createProduct = async(data : productData) => {
    try {
        return await axiosInstance.post('/product/add',data);
    } catch (error) {
        console.log(error);
    }
}


export const useCreateProduct = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data : productData ) => {
            return createProduct(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getProductsQueryOption().queryKey })
            close?.();
        },
    })
}