import React, { memo, useCallback, useEffect, useState } from "react";
import PopUp from "@/components/pop-up-drawer";
import AddEditProduct from "./add-edit-product-modal";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { updateCategoryIds, updateSearch } from "@/redux/features/admin/product-table-filters";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/api/category/get-category";
import type { Category } from "@/type/type";


const SearchInput = memo(() => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const changeSearch = useCallback(( e : React.ChangeEvent<HTMLInputElement> ) => {
        setSearch(e.target.value);
    },[]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(updateSearch({ search }))
        },500)
        return () => clearTimeout(timer);
    },[search])
    return(
        <input 
            type="search" 
            name="search" 
            id="search" 
            className={
                cn(
                    "px-4 py-2 border border-green-900",
                    "rounded font-mont font-medium text-[12px]",
                    "bg-green-800 text-white"
                )
            }
            placeholder="Search Products.."
            value={search}
            onChange={changeSearch}
        />
    )
});


const CategorySelector = memo(() => {

    const [show, setShow] = useState<boolean>(false);
    const [checkedValues , setCheckedValues] = useState<string[]>([]);
    const getCategoryMutation = useGetCategories({});
    const dispatch = useDispatch<AppDispatch>();

    const categories : Category[] = getCategoryMutation?.data?.data?.data ?? [];

    const updateCategory = useCallback(( e : React.ChangeEvent<HTMLInputElement> , id : string) => {
        const checked = e.target.checked;
        if(checked){
            setCheckedValues((checkedVal) => [ ...checkedVal , id ]);
        }else{
            const newIds = [ ...checkedValues].filter((cId) => cId != id );
            setCheckedValues(newIds);
        }
    },[checkedValues]);

    const filterProduct = useCallback(() => {
        setShow(false);
        dispatch(updateCategoryIds({ categoryIds : checkedValues }));
    },[checkedValues ]);

    return(
        <div className="relative">
            <Button 
                className={
                    cn(
                        "bg-green-900 rounded font-mont font-normal",
                        "relative z-49", "cursor-pointer", "min-w-50"
                    )
                }
                onClick={() => setShow((s) => !s)}
            >
               {
                checkedValues.length ?  `${checkedValues.length} category selected` :  "Select Category"
               }
            </Button>
            {
                show && (
                    <div 
                        className={
                            cn(
                                "z-48 absolute top-full left-0 right-0 bg-green-900 text-white",
                                "transition-all duration-300 ease-in-out px-4 py-2 pr-0",
                            )
                        }
                    >
                        <ul 
                            className={
                                cn(
                                    " bg-green-900 text-white max-h-50 overflow-y-auto",
                                )
                            }
                        >
                            {
                                getCategoryMutation.isLoading ? (
                                    "Loading"
                                ) : (
                                    categories.map((cat,i) => (
                                        <li className="flex items-center py-1" key={i}>
                                            <input 
                                                type="checkbox" 
                                                name="cat" id={`cate-${cat.name}`} 
                                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => updateCategory(e, cat._id)} checked={checkedValues.includes(cat._id)} 
                                            />
                                            <span className="text-[12px] text-white font-mont font-normal ml-2">{cat.name}</span>
                                        </li>
                                    ))
                                )
                            }
                        </ul>
                        <div className="w-full pr-4">
                             <Button
                                className={
                                    cn(
                                        "bg-green-800 rounded text-white font-mont",
                                        "my-2 w-full text-[12px] font-normal", "cursor-pointer"
                                    )
                                }
                                onClick={filterProduct}
                            >
                                Filter
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
})


const AddProduct = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div className="w-full flex justify-between">
            <div className="flex items-center gap-4">
                <SearchInput/>
                <CategorySelector/>
            </div>
            <button 
                onClick={() => setIsOpen(true)}
                className="
                    px-2 py-1 flex items-center justify-center bg-[#0B6434] text-[white] 
                    border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[14px] font-medium"
            >
                    Add Product
            </button>
            <PopUp
                keyProp='add-product'
                model={(close) => <AddEditProduct close={close}/>}
                handleClose={() => setIsOpen(false)}
                isOpen={isOpen}
            />
        </div>
    )
});

export default AddProduct;