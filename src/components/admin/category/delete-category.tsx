import { useDeleteCategory } from "@/api/category/delete-category";
import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useCallback } from "react";



const DeleteCategoryModal = memo(( { close , id } : { close : () => void; id: string; } ) => {
    const deleteCategoryMutation = useDeleteCategory({ id , close });

    const handleDelete = useCallback(() => {
        deleteCategoryMutation.mutate();
    },[])
    return(
        <div className="w-100 min-h-10 p-4 bg-[#016630] dark:bg-[#016630] rounded flex items-center justify-center flex-col">
            <p className="text-[16px] text-white font-medium font-mont">Are you sure you want to delete this item?</p>
            <div className="flex items-center justify-center gap-2 self-end mt-2">
                <Button onClick={close} className={cn("cursor-pointer")}>Cancel</Button>
                <Button 
                    className={cn("bg-red-800 hover:bg-red-900 cursor-pointer")}
                    onClick={handleDelete}
                >
                    {
                        deleteCategoryMutation.isPending ? "Deleting.." : "Delete"
                    }
                </Button>
            </div>
        </div>
    )
})


const DeleteCategory = memo(( 
    { id }: { id : string}
) => {
    return(
        <>
            <PopUp
                trigger={(open) =>  <Button className={cn("cursor-pointer bg-transparent text-black hover:bg-transparent")} onClick={open}>Delete</Button>}
                model={(close) => (
                    <DeleteCategoryModal close={close} id={id}/>               
                )}
                keyProp={'delete-category'}
            />
        </>
    )
});

export default DeleteCategory;