import React, { memo, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetProducts } from "@/api/product/get-product";
import { Bars } from "react-loader-spinner";
import type { Product } from "@/type/type";
import { Button } from "@/components/ui/button";
import PopUp from "@/components/pop-up-drawer";
import AddEditProduct from "./add-edit-product-modal";
import { DeleteProductModal } from "./delete-product";
import { timeAgo } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
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




const TableHead = memo((
) => {
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


const TableRow = memo(({ product , index , setProduct , setDeleteProduct}: { product : Product ; index: number ; setProduct : (v : Product) => void ; setDeleteProduct : (v: Product) => void } ) => {
  return(
    <tr
      key={product._id}
      className={`border-b border-default font-mont capitalize ${
        index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#0B6434] text-white'
      }`}

    >
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {product.name}
      </th>
        <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {product.category.name}
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
        <Badge className={
          cn(
            product.active ? index %2==0 ? "bg-green-800" : "bg-white text-black" : "bg-red-800"
          )
        } >{product.active ? "Active" : "Inactive"}</Badge>
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
        {timeAgo(product.createdAt)}
      </th>
      <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
       {timeAgo(product.updatedAt)}
      </th>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <EditProduct product={product} evenRow={index % 2 === 0}/> */}
          <Button 
            className={cn("cursor-pointer bg-transparent hover:bg-transparent", index%2===1 ? "text-white" :"text-black" )}
            onClick={() => setProduct(product)}
          >
            Edit
          </Button>
          <Button 
            className={cn("cursor-pointer bg-transparent hover:bg-transparent", index%2===1 ? "text-white" :"text-black" )}
            onClick={() => setDeleteProduct(product)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
})




const ProductTable: React.FC = memo( () => {

  const [isOpenEditProduct, setIsOpenEditProduct] = useState<boolean>(false);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const search = useSelector((store : RootState) => store.productTableFilters.search);
  const categoryIds = useSelector((store : RootState) => store.productTableFilters.categoryIds);
  const sort =  useSelector((store : RootState) => store.productTableFilters.sort);
  const active =  useSelector((store : RootState) => store.productTableFilters.active);


  const getProductMutation = useGetProducts({search , categoryIds , sort , active});

  const openProductEditModal = useCallback((product : Product) => {
    setIsOpenEditProduct(true);
    setSelectedProduct(product);
  },[])

  const openDeleteProductModal = useCallback((product  : Product ) => {
    setIsOpenDeleteProduct(true);
    setSelectedProduct(product);
  },[])

  if(getProductMutation.isLoading){
    return <div className="flex items-center justify-center mt-6">
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


  if(!products.length){
    return(
      <div className="mt-4">
        <h1 className="font-mont text-[16px] text-black text-center font-medium">No Products Found</h1>
      </div>
    )
  }


  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default mt-4">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <TableHead/>
        <tbody>
          { products.map((product, index) => (
            <TableRow product={product} index={index} setProduct={openProductEditModal}  setDeleteProduct={openDeleteProductModal}/>
          ))}
        </tbody>
      </table>
      <PopUp 
        model={(close) => <AddEditProduct close={close} product={selectedProduct as Product}/>}
        isOpen={isOpenEditProduct}
        handleClose={() => setIsOpenEditProduct(false)}
        keyProp={'edit-product'}
      />
      <PopUp 
        model={(close) => <DeleteProductModal close={close} id={selectedProduct?._id as string}/>}
        isOpen={isOpenDeleteProduct}
        handleClose={() => setIsOpenDeleteProduct(false)}
        keyProp={'delete-product'}
      />
    </div>
  );
});

export default ProductTable;