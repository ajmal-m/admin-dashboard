import {  memo } from "react";
import OrdersTable from "@/components/admin/orders/order-table";


const AdminOrdersPage = memo(() => {
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <h1>Orders</h1>
            <OrdersTable/>
        </section>
    )
});

export default AdminOrdersPage;