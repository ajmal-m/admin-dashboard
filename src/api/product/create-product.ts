import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

type productData = FormData;



export const createProduct = async(data : productData) => {
    try {
        return await axiosInstance.post('/product/add',data);
    } catch (error) {
       throw error
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
    const sort = useSelector((store : RootState) => store.productTableFilters.sort);
    const active = useSelector((store : RootState) => store.productTableFilters.active);


    return useMutation({
        mutationFn: (data : productData ) => {
            return createProduct(data);
        },
        onError(error : AxiosError<{ message: string }>) {
            const message = error?.response?.data?.message ?? 'Error on server'
            toast.error(message)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getProductsQueryOption({
                search,
                categoryIds,
                sort,
                active
            }).queryKey })
            close?.();
        },
    })
}