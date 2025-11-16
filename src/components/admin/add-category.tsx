import { memo } from "react";
import PopUp from "../pop-up";
import AddCategoryModal from "./add-category-modal";

const AddCategory = memo(() => {
    return(
        <div className="w-full flex justify-end">
            <PopUp 
                model={
                    () => (
                        <AddCategoryModal/>
                    )
                } 
                trigger={
                    (open) => (
                        <button 
                            onClick={open}
                            className="
                                px-2 py-1 flex items-center justify-center bg-[#0B6434] text-[white] 
                                border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[16px] font-semibold"
                        >
                                Add Category
                        </button>
                    )
                }
                keyProp={'add-category'}
            />
        </div>
    )
});

export default AddCategory;