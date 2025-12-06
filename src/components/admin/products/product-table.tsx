import React, { memo } from "react";
import { cn } from "@/lib/utils";
const rows = [
    "Product Name",
    "Category",
    "Price",
    "Stock",
    "Image",
    "Status",
    "Created At",
    "Updated At",
    "Action",
];

const ProductTable: React.FC = memo( () => {


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
          { new Array(20).fill(-1).map((_, index) => (
            <tr
              key={index}
              className={`border-b border-default font-mont ${
                index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
              }`}

            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Mango
              </th>
               <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Fruits
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Rs. 240
              </th>
               <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                300
              </th>
              <td className="px-6 py-4">
                <img className="w-10 h-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZsfkc2zDCA423IfWyeg_FaRvFs_LyLeMUw&s" loading="lazy" />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Active
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                2 Month ago
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                2 Days ago
              </th>
              <td className="px-6 py-4">
                <p>Edit</p>
                <p>Delete</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default ProductTable;
