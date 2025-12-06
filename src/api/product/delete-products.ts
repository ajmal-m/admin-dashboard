import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";



export const deleteProduct = async( id : string ) => {
    try {
        return await axiosInstance.delete(`/product?id=${id}`);
    } catch (error) {
        console.log(error);
    }
}


export const useDeleteProduct = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ( id : string  ) => {
            return deleteProduct(id);
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