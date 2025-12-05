import axiosInstance from "../api";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "./get-category";

type CategoryData = FormData;



export const updateCategory = async({ data , id , public_id} : { data: CategoryData ; id : string; public_id : string;}) => {
    try {
        return await axiosInstance.put(`/category?id=${id}&public_id=${public_id}`,data);
    } catch (error) {
        console.log(error);
    }
}


export const useUpdateCategory = ({
    close ,
}: {
    close ?: () => void;
}) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ data , id , public_id }: { data : CategoryData ; id : string; public_id : string;}  ) => {
            return updateCategory({ data, id , public_id });
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