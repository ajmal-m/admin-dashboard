import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";

type productData = FormData;



export const createProduct = async(data : productData) => {
    try {
        return await axiosInstance.post('/product/add',data);
    } catch (error) {
       return error
    }
}


export const useCreateProduct = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient();
     const search = useSelector((store : RootState) => store.productTableFilters.search);
        const categoryIds = useSelector((store : RootState) => store.productTableFilters.categoryIds);
    return useMutation({
        mutationFn: (data : productData ) => {
            return createProduct(data);
        },
        onError(error) {
            const message = error?.response?.data?.message ?? 'Error on server'
            toast.error(message)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getProductsQueryOption({
                search,
                categoryIds
            }).queryKey })
            close?.();
        },
    })
}