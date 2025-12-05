import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useGetCategories } from "@/api/category/get-category";
import { type  Category } from "@/type/category";
import { Bars } from 'react-loader-spinner';
import EditCategory from "./edit-category";
import DeleteCategory from "./delete-category";

const rows = [
    "Category Name",
    "Image",
    "Action",
]

const CategoryTable: React.FC = memo( () => {

  const getCategoryMutation =  useGetCategories({});

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
        <tbody>
          { categories.map((category : Category, index : number) => (
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
                <EditCategory category={category} evenRow={index % 2 === 0} />
                <DeleteCategory id={category._id} evenRow={index % 2 === 0}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CategoryTable;
