import AddProduct from "@/components/admin/products/add-product";
import ProductTable from "@/components/admin/products/product-table";
import {  memo } from "react";


const AdminProductPage = memo(() => {
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <AddProduct/>
            <ProductTable/>
        </section>
    )
});

export default AdminProductPage;