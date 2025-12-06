import { memo, useCallback, useState } from "react";
import CloseIcon from "../icon/close";
import { useGetCategories } from "@/api/category/get-category";
import type { Category } from "@/type/category";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddEditPropType = {
    close: () => void;
}



const Toggle = memo( ({
    value, onChange
} : { value : boolean; onChange: (e : React.ChangeEvent<HTMLInputElement> ) => void }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer outline-none"
        name="active"
        onChange={onChange}
        checked={value}
      />
      <div className="relative w-9 h-5 bg-red-400 rounded-full peer 
      peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:bg-green-400
      peer-checked:after:border-buffer after:content-[''] after:absolute after:start-[2px] after:bg-white
      after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand border border-white outline-none focus:outline-none"></div>
    </label>
  );
});



const AddEditProduct = memo((
    { close }: AddEditPropType
) => {

    const [productData, setProductData] = useState({
        name:"",
        category:"",
        price:0,
        stock:0,
        active:true
    });
    const [setImagePreview] = useState<String | null>(null)
    const getCategoryMutation = useGetCategories({});
    const categories : Category[] = getCategoryMutation.data?.data?.data ?? [];


    const updateToggle = useCallback(( e : React.ChangeEvent<HTMLInputElement> ) => {
        const { name, checked }= e.target;
        setProductData((prevData) => ({ ...prevData , [name] : checked }) )
    },[])


    const updateProductData = useCallback((e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
        const { name, value} = e.target;
        setProductData((prevData) => ({ ...prevData , [name] : value }) );
    },[]);

    const handleSubmit = useCallback(( e : React.FormEvent) => {
        e.preventDefault();
        console.log(productData);
    },[productData]);


    const uploadImage = useCallback(( e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        const image = URL.createObjectURL(file);
        setImagePreview(image);
    },[])

    return(
        <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white">
            {/* Header */}
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

            {/* Form Content */}
            <form className="pt-4 md:pt-6" onSubmit={handleSubmit} >
                {/* Product Name */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block mb-2.5 text-sm text-heading font-mont"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border border-white text-heading text-sm outline-none rounded-base block 
                        w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont"
                        placeholder="Enter product name"
                        required
                        onChange={updateProductData}
                        value={productData.name}
                    />
                </div>


                {/* category select */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block mb-2.5 text-sm text-heading font-mont"
                    >
                        Category
                    </label> 
                    <select 
                        name="category" 
                        id="category"
                         className="border border-white text-heading text-sm outline-none rounded-base block 
                        w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont max-h-40"
                        onChange={updateProductData}
                        value={productData.category}
                    >
                        {
                            getCategoryMutation.isLoading ? 
                            (
                                <option value="">Loading...</option>
                            ) : categories.map((category) => (
                                <option value={category._id} key={category.name} className="text-green-800">{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block mb-2.5 text-sm text-heading font-mont"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="border border-white text-heading text-sm outline-none rounded-base block 
                        w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont"
                        placeholder="Enter price"
                        required
                        onChange={updateProductData}
                        value={productData.price}
                    />
                </div>

                {/* Stock */}
                <div className="mb-4">
                    <label
                        htmlFor="stock"
                        className="block mb-2.5 text-sm text-heading font-mont"
                    >
                        Stock
                    </label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        className="border border-white text-heading text-sm outline-none rounded-base block 
                        w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont"
                        placeholder="Enter stock"
                        required
                        onChange={updateProductData}
                        value={productData.stock}
                    />
                </div>


                {/* Active  */}
                <div className="mb-4 flex w-full justify-between">
                    <label
                        htmlFor="name"
                        className="mb-2.5 text-sm text-heading font-mont"
                    >
                        Active
                    </label>
                   <Toggle value={productData.active} onChange={updateToggle} />
                </div>
    
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2.5 text-sm text-heading font-mont" 
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        className="bg-neutral-secondary-medium border border-default-medium text-heading 
                        text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 
                        shadow-xs placeholder:text-body cursor-pointer"
                        onChange={uploadImage}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 text-black font-medium border bg-[white] border-transparent 
                    hover:bg-brand-strong shadow-xs leading-5 rounded text-sm px-4 py-2.5 w-full cursor-pointer
                    font-mont h-10 flex items-center justify-center
                "
                >
                    Add
                </button>
    
            </form>
        </div>
    )
});

export default AddEditProduct;