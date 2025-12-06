import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { useGetProducts } from "@/api/product/get-product";
import { Bars } from "react-loader-spinner";
import type { Product } from "@/type/type";
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

  const getProductMutation = useGetProducts({});

  if(getProductMutation.isLoading){
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

  const products : Product[] = getProductMutation.data?.data?.data ?? [];

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
          { products.map((product, index) => (
            <tr
              key={index}
              className={`border-b border-default font-mont ${
                index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
              }`}

            >
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {product.name}
              </th>
               <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {product.category}
              </th>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                Rs. {product.price}
              </th>
               <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {product.stock}
              </th>
              <td className="px-6 py-4">
                <img 
                  className="w-10 h-10" 
                  src={product.image.secure_url}
                  alt={product.name}
                  loading="lazy" />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                {
                  product.active ? "Active" :"Inactive"
                }
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
