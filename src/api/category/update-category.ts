import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "./get-category";

type CategoryData = FormData;



export const updateCategory = async(data : CategoryData) => {
    try {
        return await axiosInstance.put('/category',data);
    } catch (error) {
        console.log(error);
    }
}


export const useUpdateCategory = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data : CategoryData ) => {
            return updateCategory(data);
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