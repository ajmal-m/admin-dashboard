import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "./get-category";




export const deleteCategory = async(id : string) => {
    try {
        return await axiosInstance.delete(`/category?id=${id}`);
    } catch (error) {
        console.log(error);
    }
}


export const useDeleteCategory = ({
    close ,
    id
}: {
    close ?: () => void;
    id:string;
}) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ( ) => {
            return deleteCategory(id);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess(data) {
            close?.();
            queryClient.invalidateQueries({ queryKey : (getCategoryQueryOptions()).queryKey })
        },
    })
}