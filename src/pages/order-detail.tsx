import { memo } from "react";
import ProtectedRoute from "@/components/auth/protected-route";



const OrderDetailSection = memo(() => {
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <h1>Order Detail Section</h1>
        </section>
    )
});


const OrderDeatilPage = memo(() => {
    return(
        <ProtectedRoute>
            <OrderDetailSection/>
        </ProtectedRoute>
    )
});

export default OrderDeatilPage;