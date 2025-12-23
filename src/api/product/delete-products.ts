import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getProductsQueryOption } from "./get-product";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";



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
     const search = useSelector((store : RootState) => store.productTableFilters.search);
    const categoryIds = useSelector((store : RootState) => store.productTableFilters.categoryIds);
    const sort = useSelector((store : RootState) => store.productTableFilters.sort);
    const active = useSelector((store : RootState) => store.productTableFilters.active);
    const page = useSelector((store : RootState) => store.productTableFilters.page);
    const limit = useSelector((store : RootState) => store.productTableFilters.limit);



    return useMutation({
        mutationFn: ( id : string  ) => {
            return deleteProduct(id);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey : getProductsQueryOption({
                search,
                categoryIds,
                sort,
                active,
                page,
                limit
            }).queryKey })
            close?.();
        },
    })
}