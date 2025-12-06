import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";

type productData = FormData;



export const updateProduct = async({data , id}: { data : productData , id: string}) => {
    try {
        return await axiosInstance.put(`/product?id=${id}`,data);
    } catch (error) {
        console.log(error);
    }
}


export const useUpdateProduct = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ data  , id }: { data : productData, id : string}) => {
            return updateProduct({ data, id});
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