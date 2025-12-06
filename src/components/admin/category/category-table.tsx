import React, { memo, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/api/category/get-category";
import { type  Category } from "@/type/type";
import { Bars } from 'react-loader-spinner';
import AddEditCategoryModal from "./add-edit-category-modal";
import { Button } from "@/components/ui/button";
import PopUp from "@/components/pop-up-drawer";
import { DeleteCategoryModal } from "./delete-category";

const rows = [
    "Category Name",
    "Image",
    "Action",
]


const TableHead = memo(() => {
  return(
    <thead className="bg-neutral-secondary-soft border-b border-default">
      <tr>
        {
            rows.map((rowItem ) => (
                  <th scope="col" 
                  className={cn("px-6 py-3 font-medium font-mont text-[16px]" ) }
                  key={rowItem}
                  >{rowItem}</th>
            ))
        }
      </tr>
    </thead>
  )
});


const TableRow = memo(( { category , index , setCategory , setDelCategory }: 
    { category : Category; index: number; setCategory : (category: Category) => void ; setDelCategory: (category: Category) => void } 
) => {
  return(
    <tr
      key={index}
      className={`border-b border-default font-mont ${
        index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
      }`}

    >
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {category.name}
      </th>
      <td className="px-6 py-4">
        <img className="w-10 h-10" src={category.image?.secure_url} alt={category.name} loading="lazy" />
      </td>
      <td className="px-6 py-4">
        <Button 
          className={cn("cursor-pointer bg-transparent hover:bg-transparent", index%2!=0 ? "text-white" :"text-black" )} 
          onClick={() => setCategory(category)}
        >
          Edit
        </Button>
        <Button 
          className={cn("cursor-pointer bg-transparent hover:bg-transparent" , index%2!==0 ? "text-white" : "text-black")} 
          onClick={() => setDelCategory(category) }
        >
          Delete
        </Button>
      </td>
    </tr>
  )
})


const CategoryTable: React.FC = memo( () => {

  const [isOpenEditCategory, setIsOpenEditCategory] = useState<boolean>(false);
  const [isOpenDelCategory, setIsOpenDelCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const getCategoryMutation =  useGetCategories({});

  const openEditCategoryModal = useCallback(( category : Category) => {
    setSelectedCategory(category);
    setIsOpenEditCategory(true);
  },[]);


  const openDeleteCategoryModal = useCallback(( category : Category) => {
    setSelectedCategory(category);
    setIsOpenDelCategory(true);
  },[])


  if(getCategoryMutation.isLoading){
    return <div className="flex items-center justify-center">
      <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
      />
    </div>
  }


  const categories : Category[] = getCategoryMutation.data?.data?.data ?? [];


  if(!categories.length){
    return (
      <div>
        <h1>No Items Found!</h1>
      </div>
    )
  }

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-body">
       <TableHead/>
        <tbody>
          { categories.map((category : Category, index : number) => (
           <TableRow category={category} index={index} setCategory={openEditCategoryModal} setDelCategory={openDeleteCategoryModal} />
          ))}
        </tbody>
      </table>
      <PopUp
        keyProp={'edit-category'}
        model={(close) => (<AddEditCategoryModal close={close} category={selectedCategory as Category}/>) }
        isOpen={isOpenEditCategory}
        handleClose={() => setIsOpenEditCategory(false)}
      />
       <PopUp
        keyProp={'delete-category'}
        model={(close) => (<DeleteCategoryModal close={close} id={selectedCategory?._id as string}/>) }
        isOpen={isOpenDelCategory}
        handleClose={() => setIsOpenDelCategory(false)}
      />
    </div>
  );
});

export default CategoryTable;
