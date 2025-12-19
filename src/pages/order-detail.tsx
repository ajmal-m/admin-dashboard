import { memo, type ReactNode } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { useParams } from "react-router";
import { useGetOrderById } from "@/api/order/get-order-by-id";
import { Oval } from "react-loader-spinner";
import type {  OrderAddress, OrderItemWithProduct, OrderWithProduct } from "@/type/type";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_COLOR, paymentStatusClass, timeAgo } from "@/utils/utils";



const CardItem = memo((
    { heading , content }:{ heading : string ; content: any; }
) => {
    return(
        <div className="bg-green-800 rounded p-4 min-h-20">
            <h1 className="text-[16px] text-white font-mont font-medium">{heading}</h1>
            <p className="text-[24px] text-white font-mont font-medium" >{content}</p>
        </div>
    )
});


const ShippingAddress = memo((
    { address }: { address : OrderAddress }
) => {
    return(
        <div className="bg-green-800 rounded min-h-20 p-6">
            <h1 className="text-[16px] text-white font-mont font-medium">Shipping Address</h1>
           <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
            {
                Object.values(address).map((val , index ) => (
                    <div className="bg-white rounded p-4" key={index}>
                        <p className="text-[14px] text-black font-mont font-medium capitalize" >{val as ReactNode}</p>
                    </div>
                ))
            }
           </div>
        </div>
    )
});


const OrderedProductCard = memo((
    { orderItem }: { orderItem : OrderItemWithProduct }
) => {
    return(
        <div className="min-w-[250px] min-h-50 bg-white rounded flex-1 flex flex-col p-4">
            <img 
                className="w-50 h-50 self-center"
                src={orderItem.product.image.secure_url} loading="lazy" 
                alt="prouct-image" 
            />
            <h1 className="text-[16px] text-black font-mont font-medium capitalize">{orderItem.name}</h1>
            <div className="grid grid-cols-2">
                <p className="text-[14px] text-black font-mont">Quantity</p>
                <span className="text-[14px] text-black font-mont font-medium" >{orderItem.quantity as ReactNode} Kg</span>
            </div>
                <div className="grid grid-cols-2">
                <p className="text-[14px] text-black font-mont">Price</p>
                <span className="text-[14px] text-black font-mont font-medium" >₹ {orderItem.price as ReactNode}</span>
            </div>
                <div className="grid grid-cols-2">
                <p className="text-[14px] text-black font-mont">SubTotal</p>
                <span className="text-[14px] text-black font-mont font-medium" >₹ {orderItem.subTotal as ReactNode}</span>
            </div>
        </div>
    )
});

const OrderedProducts = memo((
    { items }: { items : OrderItemWithProduct[] }
) => {
    return(
        <div className="bg-green-800 rounded min-h-20 p-6">
             <h1 className="text-[16px] text-white font-mont font-medium capitalize">Ordered Products</h1>
             <div className="mt-4 flex flex-wrap gap-4">
                {
                   items.map((orderItem) => (
                        <OrderedProductCard key={orderItem.product._id} orderItem={orderItem}/>
                    ))
                }
             </div>
        </div>
    )
});


const OrderDetailSection = memo(() => {
    const params = useParams();
    const getOrderByIdMutation = useGetOrderById({ id : params.id as string });

    if(getOrderByIdMutation.isLoading){
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
    }

    if(getOrderByIdMutation.error){
        return(
            <div className="flex justify-center min-h-screen pt-5">
                <h1>Error Message</h1>
            </div>
        )
    }

    const order : OrderWithProduct = getOrderByIdMutation.data?.data?.data ?? [];
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <div className="grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
               <CardItem 
                    heading="Grand Total" 
                    content={`₹ ${order.grandTotal}` }
                />
               <CardItem 
                    heading="Payment Status" 
                    content={
                        <Badge className={cn( paymentStatusClass[order.payment.status as string])} >{order.payment.status}</Badge>
                    } 
               />
               <CardItem 
                    heading="Order Status" 
                    content={
                        <Badge className={cn(ORDER_STATUS_COLOR[order.orderStatus])} >{order.orderStatus}</Badge>
                    }
                />
                <CardItem 
                    heading="Last Update At" 
                    content={
                        <span className="text-[16px]">{timeAgo(order.updatedAt)}</span>
                    }
                />
            </div>
            <div className="grid grid-cols-1 mt-4 w-full">
                <ShippingAddress address={order.shippingAddress}/>
            </div>
            <div className="grid grid-cols-1 mt-4 w-full">
                <OrderedProducts items={order.items}/>
            </div>
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