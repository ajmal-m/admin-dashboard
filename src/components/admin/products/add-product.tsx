import { memo } from "react";
import PopUp from "../../pop-up";
import AddEditProduct from "./add-edit-product-modal";

const AddProduct = memo(() => {
    return(
        <div className="w-full flex justify-end">
            <PopUp 
                model={
                    (close) => (
                        <AddEditProduct/>
                    )
                } 
                trigger={
                    (open) => (
                        <button 
                            onClick={open}
                            className="
                                px-2 py-1 flex items-center justify-center bg-[#0B6434] text-[white] 
                                border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[14px] font-medium"
                        >
                                Add Product
                        </button>
                    )
                }
                keyProp={'add-category'}
            />
        </div>
    )
});

export default AddProduct;