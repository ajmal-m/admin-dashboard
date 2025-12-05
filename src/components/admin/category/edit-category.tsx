import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";
import AddEditCategoryModal from "../add-edit-category-modal";
import { type Category } from "@/type/category";


type EditCategoryPropType = {
    category: Category;
    evenRow: boolean;
}


const EditCategory = memo(( { category , evenRow }:EditCategoryPropType  ) => {
    return(
        <PopUp
            trigger={ (open) => <Button className={cn("cursor-pointer bg-transparent hover:bg-transparent", !evenRow ? "text-white" :"text-black" )} onClick={open}>Edit</Button> }
            model={ (close) => 
               <AddEditCategoryModal close={close} isEdit={true} currName={category?.name} currImage={category.image?.secure_url} id={category._id} public_id={category.image?.public_id}/>
            }
            keyProp='edit-category'
        />
    )
});

export default EditCategory;