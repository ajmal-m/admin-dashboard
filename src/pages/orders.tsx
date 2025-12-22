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
import {  ORDER_STATUS_COLOR, paymentStatusClass, timeAgo } from "@/utils/utils";
import { Badge } from "@/components/ui/badge";


const OrderCard = memo((
    { order }: { order :Order }
) => {
    return(
        <div className="min-w-10 min-h-50 border border-green-500 hover:border-green-700 rounded p-4 grid grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 gap-4">
                <p className="text-[14px] font-mont text-black">Items placed</p>
                <span className="text-[14px] font-mont text-black">{order.items.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-[14px] font-mont text-black">Total payment</p>
                <span className="text-[14px] font-mont text-black font-medium">₹ {order.grandTotal}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-[14px] font-mont text-black">Payment status</p>
                <Badge className={cn('text-[12px] font-mont text-white lowercase' , 
                   order.payment.status && paymentStatusClass[order.payment.status] )}>{order.payment.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-[14px] font-mont text-black">Order status</p>
                <Badge className={cn('text-[12px] font-mont text-white lowercase' , 
                   order.orderStatus && ORDER_STATUS_COLOR[order.orderStatus] )}>{order.orderStatus}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <p className="text-[14px] font-mont text-black">Order placed</p>
                <span className="text-[14px] font-mont text-black">{ timeAgo(order.createdAt as string)}</span>
            </div>
            <Link to={`/order/${order._id}`} className={cn("w-full")}>
                <Button className={cn("rounded bg-green-800 font-mont cursor-pointer text-[16px] w-full")}>
                    For More Details    
                </Button>  
            </Link>
        </div>
    )
});


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


    const orders : Order[] = getOrdersMutation.data?.data?.data ?? [];

    if(orders.length===0){
        return(
           <div className="min-h-screen px-10 max-[992px]:px-4 mt-4">
                <h1 
                    className="text-[16px] font-mont text-black 
                    font-medium text-center"
                >
                    No Orders yet
                </h1>
           </div>
        )
    }

    return(
        <section  className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {
                    orders.map((order, _) =>(
                        <OrderCard order={order}/>
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