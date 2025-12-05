import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";
import AddEditCategoryModal from "../add-edit-category-modal";
import { type Category } from "@/type/category";


type EditCategoryPropType = {
    category: Category
}


const EditCategory = memo(( { category }:EditCategoryPropType  ) => {
    return(
        <PopUp
            trigger={ (open) => <Button className={cn("cursor-pointer bg-transparent text-black hover:bg-transparent")} onClick={open}>Edit</Button> }
            model={ (close) => 
               <AddEditCategoryModal close={close} isEdit={true} currName={category?.name} currImage={category.image}/>
            }
            keyProp='edit-category'
        />
    )
});

export default EditCategory;