import { useDeleteOrder } from "@/api/order/delete-order";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useCallback } from "react";



export const DeleteOrderModal = memo(( { close , id } : { close : () => void; id: string; } ) => {
    const deleteOrderMutation = useDeleteOrder({ onSuccess:() => {
        close();
    } });

    const handleDelete = useCallback(() => {
        deleteOrderMutation.mutate({ id });
    },[])
    return(
        <div className="w-100 min-h-10 p-4 bg-[#016630] dark:bg-[#016630] rounded flex items-center justify-center flex-col">
            <p className="text-white font-normal text-[14px] font-mont self-start">Are you sure you want to delete this item?</p>
            <div className="flex items-center justify-center gap-2 self-end mt-4">
                <Button onClick={close} className={cn("cursor-pointer font-mont")}>Cancel</Button>
                <Button 
                    className={cn("bg-red-800 hover:bg-red-900 cursor-pointer font-mont")}
                    onClick={handleDelete}
                >
                    {
                        deleteOrderMutation.isPending ? "Deleting.." : "Delete"
                    }
                </Button>
            </div>
        </div>
    )
});