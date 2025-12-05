import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";



const DeleteCategoryModal = memo(( { close} : { close : () => void} ) => {
    return(
        <div className="w-100 min-h-10 p-4 bg-[#016630] dark:bg-[#016630] rounded flex items-center justify-center flex-col">
            <p className="text-[16px] text-white font-medium font-mont">Are you sure you want to delete this item?</p>
            <div className="flex items-center justify-center gap-2 self-end mt-2">
                <Button onClick={close} className={cn("cursor-pointer")}>Cancel</Button>
                <Button className={cn("bg-red-800 hover:bg-red-900 cursor-pointer")}>Delete</Button>

            </div>
        </div>
    )
})


const DeleteCategory = memo(() => {
    return(
        <>
            <PopUp
                trigger={(open) =>  <Button className={cn("cursor-pointer bg-transparent text-black hover:bg-transparent")} onClick={open}>Delete</Button>}
                model={(close) => (
                    <DeleteCategoryModal close={close}/>               
                )}
                keyProp={'delete-category'}
            />
        </>
    )
});

export default DeleteCategory;