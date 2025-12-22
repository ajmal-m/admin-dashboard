import { memo, useCallback, useState } from "react";
import CloseIcon from "../icon/close";
import { useGetCategories } from "@/api/category/get-category";
import type { Category, Product } from "@/type/type";
import { useCreateProduct } from "@/api/product/create-product";
import { Oval } from "react-loader-spinner";
import { useUpdateProduct } from "@/api/product/update-product";

type AddEditPropType = {
    close: () => void;
    product ?: Product
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
      peer-checked:after:border-buffer after:content-[''] after:absolute after:start-0.5 after:bg-white
      after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand border border-white outline-none focus:outline-none"></div>
    </label>
  );
});



const AddEditProduct = memo((
    { close , product }: AddEditPropType
) => {

    const [productData, setProductData] = useState({
        name: product?.name ?? "",
        category: product?.category._id ?? "",
        price: product?.price ?? '0',
        stock: product?.stock ?? '0',
        active: product?.active ?? true
    });
    const [file, setFile] = useState<File | null>(null);

    const getCategory = useGetCategories({});
    const createProductMutation = useCreateProduct({ close });
    const updateProductMutation = useUpdateProduct({ close });

    const categories : Category[] = getCategory.data?.data?.data ?? [];


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
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", String(productData.price) );
        formData.append("category", String(productData.category) );
        formData.append("stock", String(productData.stock) );
        formData.append("active", productData.active ? "1" : "0");
        if(file){
            formData.append("image" , file as File);
        }
        if(product){
            formData.append("public_id", product.category.image?.public_id as string)
            updateProductMutation.mutate({ data: formData, id : product._id })
        }else{
            createProductMutation.mutate(formData)
        }
    },[productData , file]);


    const uploadImage = useCallback(( e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setFile(file);
    },[])

    return(
        <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                <h3 className="text-lg text-heading font-mont">
                    { product ? 'Edit' : 'New' } Product
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
                         <option value="" disabled>Select Category</option>
                        {
                            getCategory.isLoading ? 
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
                    {
                        createProductMutation.isPending || updateProductMutation.isPending ? (
                           <div className="flex items-center gap-2">
                            <span>{ product ? "Updating..." : "Uploading..."}</span>
                            <Oval
                                visible={true}
                                height="20"
                                width="20"
                                color="#4fa94d"
                                strokeWidth='5'
                                animationDuration='0.5'
                            />
                           </div>
                            
                        ) :(
                            product ? "Update" :"Add"
                        )
                    }
                </button>
    
            </form>
        </div>
    )
});

export default AddEditProduct;