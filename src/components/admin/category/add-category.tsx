import { memo, useState } from "react";
import PopUp from "@/components/pop-up-drawer";
import AddCategoryModal from "./add-edit-category-modal";

const AddCategory = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div className="w-full flex justify-end">
            <button 
                onClick={() => setIsOpen(true)}
                className="
                    px-2 py-1 flex items-center justify-center bg-[#0B6434] text-[white] 
                    border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[14px] font-medium"
            >
                    Add Category
            </button>
            <PopUp
                keyProp="add-category"
                model={(close) => <AddCategoryModal close={close}/>}
                handleClose={() => setIsOpen(false)}
                isOpen={isOpen}
            />
        </div>
    )
});

export default AddCategory;