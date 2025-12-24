import {  memo } from "react";
import OrdersTable from "@/components/admin/orders/order-table";
import OrderFiltersContainer from "@/components/admin/orders/order-filters-container";


const AdminOrdersPage = memo(() => {
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <OrderFiltersContainer/>
            <OrdersTable/>
        </section>
    )
});

export default AdminOrdersPage;