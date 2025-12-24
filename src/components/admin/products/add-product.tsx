import React, { memo, useCallback, useEffect, useState } from "react";
import PopUp from "@/components/pop-up-drawer";
import AddEditProduct from "./add-edit-product-modal";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { updateActiveState, updateCategoryIds, updateSearch, updateSort } from "@/redux/features/admin/product-table-filters";
import { Button } from "@/components/ui/button";
import { useGetCategories } from "@/api/category/get-category";
import type { Category } from "@/type/type";
import { ACTIVE_SELECTOR_OPTIONS, ADMIN_PRODUCT_SORT_OPTION } from "@/const/product-sort-options";


const SearchInput = memo(() => {
    const currentSearch = useSelector((store: RootState) => store.productTableFilters.search);
    const [search, setSearch] = useState<string>(currentSearch);
    const dispatch = useDispatch<AppDispatch>();
    const changeSearch = useCallback(( e : React.ChangeEvent<HTMLInputElement> ) => {
        setSearch(e.target.value);
    },[]);

    const handleSearch = useCallback((e : React.FormEvent) => {
        e.preventDefault();
         dispatch(updateSearch({ search, page:1 }));
    },[search]);
    return(
        <form onSubmit={handleSearch}>
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
        </form>
    )
});


const CategorySelector = memo(() => {

    const [show, setShow] = useState<boolean>(false);
    const cateIds = useSelector((store : RootState) => store.productTableFilters.categoryIds);
    const [checkedValues , setCheckedValues] = useState<string[]>(cateIds ?? []);
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
        dispatch(updateCategoryIds({ categoryIds : checkedValues, page:1 }));
    },[checkedValues ]);

    useEffect(() => {
        const clickFunction = (e : MouseEvent) => {
            const target = e.target?.closest("#category-select-check-box");
            if(!target) setShow(false);
        }
        document.addEventListener("click", clickFunction);
        return () => document.removeEventListener("click", clickFunction);
    },[])

    return(
        <div className="relative" id="category-select-check-box">
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
});


const SortSelector = memo(() => {
    const sort = useSelector((store : RootState) => store.productTableFilters.sort);
    const dispatch = useDispatch<AppDispatch>();
    const changeSort = useCallback(( e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateSort({ sort : e.target.value , page:1 }));
    },[])
    return(
        <select 
            name="sort" id="sort"
            className={cn(
                "rounded border border-green-900 font-mont",
                "bg-green-800 text-white cursor-pointer px-4 py-2 text-[12px]"
            )}
            onChange={changeSort}
            value={sort || ""}
        >
            <option value="">Latest Updates</option>
            {
                ADMIN_PRODUCT_SORT_OPTION.map((option) => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
});

const ActiveSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const active = useSelector((store : RootState) => store.productTableFilters.active);
    const changeActive = useCallback((e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateActiveState({ active : e.target.value , page:1 }));
    },[])
    return(
        <select 
            name="active-selector" id="active-sort"
            className={cn(
                "rounded border border-green-900 font-mont",
                "bg-green-800 text-white cursor-pointer px-4 py-2 text-[12px]"
            )}
            value={active}
            onChange={changeActive}
        >
            {
                ACTIVE_SELECTOR_OPTIONS.map((option) => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
});


const AddProduct = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return(
        <div className="w-full flex justify-between">
            <div className="flex items-center gap-4">
                <SearchInput/>
                <CategorySelector/>
                <SortSelector/>
                <ActiveSelector/>
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