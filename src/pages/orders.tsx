import { memo } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";


const OrderSection = memo(() => {
    const userId = useSelector((store : RootState) => store.auth.id);
    return(
        <div>
            <h1>UserId : {userId}</h1>
        </div>
    )
});


const OrdersPage = memo(() => {
    return(
        <ProtectedRoute>
            <OrderSection/>
        </ProtectedRoute>
    )
});

export default OrdersPage;