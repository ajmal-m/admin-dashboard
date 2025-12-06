import { useDeleteProduct } from "@/api/product/delete-products";
import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useCallback } from "react";



const DeleteProductModal = memo(( { close , id } : { close : () => void; id: string; } ) => {
    const deleteProductMutation = useDeleteProduct({ close });

    const handleDelete = useCallback(() => {
        deleteProductMutation.mutate(id);
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
                        deleteProductMutation.isPending ? "Deleting.." : "Delete"
                    }
                </Button>
            </div>
        </div>
    )
})


const DeleteProduct = memo(( 
    { id , evenRow}: { id : string; evenRow : boolean}
) => {
    return(
        <>
            <PopUp
                trigger={(open) =>  <Button className={cn("cursor-pointer bg-transparent hover:bg-transparent" , !evenRow ? "text-white" : "text-black")} onClick={open}>Delete</Button>}
                model={(close) => (
                    <DeleteProductModal close={close} id={id}/>               
                )}
                keyProp={'delete-product'}
            />
        </>
    )
});

export default DeleteProduct;