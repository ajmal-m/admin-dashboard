import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "./get-category";

type CategoryData = FormData;



export const createCategory = async(data : CategoryData) => {
    try {
        return await axiosInstance.post('/category/add',data);
    } catch (error) {
        console.log(error);
    }
}


export const useCreateCategory = ({
    close 
}: {
    close ?: () => void
}) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data : CategoryData ) => {
            return createCategory(data);
        },
        onError(error) {
            console.log(error)
        },
        async onSuccess(data) {
            close?.();
            queryClient.invalidateQueries({ queryKey : (await getCategoryQueryOptions()).queryKey })
        },
    })
}