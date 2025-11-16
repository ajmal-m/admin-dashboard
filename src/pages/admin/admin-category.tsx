import {  memo } from "react";
import AddCategory from "../../components/admin/add-category";
import CategoryTable from "../../components/admin/category-table";

const AdminCategoryPage = memo(() => {
    return(
         <section className="px-10 mt-4 max-[992px]:px-4">
            <AddCategory/>
            <CategoryTable/>
        </section>
    )
});

export default AdminCategoryPage;