import { memo } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetUserOrders } from "@/api/order/get-user-orders";
import type { Order } from "@/type/type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { Oval } from "react-loader-spinner";


const OrderSection = memo(() => {
    const userId = useSelector((store : RootState) => store.auth.id);
    const getOrdersMutation = useGetUserOrders({ id : userId });

    if(getOrdersMutation.isLoading){
        return(
          <div className="flex justify-center min-h-screen pt-5">
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                strokeWidth='2'
                animationDuration='1.5'
            />
        </div>
        )
    };


    const orders : Order[] = getOrdersMutation.data?.data.data ?? [];
    return(
        <section  className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {
                    orders.map((order, _) =>(
                    <div className="min-w-10 min-h-50 border border-green-500 hover:border-green-700 rounded p-4 grid grid-cols-1 gap-y-2">
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-[14px] font-mont text-black">Items placed</p>
                            <span className="text-[14px] font-mont text-black">{order.items.length}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-[14px] font-mont text-black">Total payment</p>
                            <span className="text-[14px] font-mont text-black">₹{order.grandTotal}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-[14px] font-mont text-black">Payment status</p>
                            <span className="text-[14px] font-mont text-black">{order.payment.status}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-[14px] font-mont text-black">Order status</p>
                            <span className="text-[14px] font-mont text-black">{order.orderStatus}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-[14px] font-mont text-black">Order placed</p>
                            <span className="text-[14px] font-mont text-black">2 days ago</span>
                        </div>
                        <Button className={cn("rounded bg-green-800 font-mont cursor-pointer text-[16px]")}>
                            <Link to={`/order/${order._id}`}>
                                For More Details    
                            </Link>
                        </Button>
                    </div>
                    ))
                }
            </div>
        </section>
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