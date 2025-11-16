import {  memo } from "react";
import ProductTable from "../../components/admin/product-table";
import AddCategory from "../../components/admin/add-category";

const AdminProductPage = memo(() => {
    return(
        <section className="px-10 mt-4">
            <AddCategory/>
            <ProductTable/>
        </section>
    )
});

export default AdminProductPage;