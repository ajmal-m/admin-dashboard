import { memo } from "react";
import CloseIcon from "../icon/close";

const AddEditProduct = memo(() => {
    return(
        <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white w-20 h-20">
             <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg text-heading font-mont">
                    New Product
                </h3>

                <button
                    type="button"
                    onClick={close}
                    className="cursor-pointer"
                >
                    <CloseIcon/>
                    <span className="sr-only">Close modal</span>
                </button>
             </div>
        </div>
    )
});

export default AddEditProduct;