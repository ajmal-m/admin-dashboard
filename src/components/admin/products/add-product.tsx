import React, { memo, useCallback, useEffect, useState } from "react";
import PopUp from "@/components/pop-up-drawer";
import AddEditProduct from "./add-edit-product-modal";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { updateSearch } from "@/redux/features/admin/product-table-filters";


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


const AddProduct = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div className="w-full flex justify-between">
            <SearchInput/>
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