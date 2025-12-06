
import PopUp from "@/components/pop-up";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo } from "react";
import AddEditProduct from "./add-edit-product-modal";
import {  type Product } from "@/type/type";


type EditProductPropType = {
    product: Product;
    evenRow: boolean;
}


const EditProduct = memo(( { evenRow , product }:EditProductPropType  ) => {
    return(
        <PopUp
            trigger={ (open) => <Button className={cn("cursor-pointer bg-transparent hover:bg-transparent", !evenRow ? "text-white" :"text-black" )} onClick={open}>Edit</Button> }
            model={ (close) => 
               <AddEditProduct close={close} product={product}/>
            }
            keyProp='edit-category'
        />
    )
});

export default EditProduct;