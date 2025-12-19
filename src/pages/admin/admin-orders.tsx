import { useGetAllOrders } from "@/api/order/get-all-orders";
import {  memo } from "react";


const AdminOrdersPage = memo(() => {
    const getAllOrdersMutation = useGetAllOrders();

    if(getAllOrdersMutation.isLoading){
        return(
            <h1>Loading....</h1>
        )
    };

    const orders = getAllOrdersMutation.data?.data.data || [];
    console.log(orders)
    return(
        <section className="px-10 mt-4 max-[992px]:px-4">
            <h1>Admin Orders Page</h1>
        </section>
    )
});

export default AdminOrdersPage;