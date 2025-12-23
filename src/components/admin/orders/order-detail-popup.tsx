import type { Order } from "@/type/type";
import { memo } from "react";


const OrderDetailPopup = memo((
    { close , order  }:
    { 
        close : () => void;
        order : Order
    }
) => {
    return(
        <div className="w-100 max-h-120 bg-green-900 rounded text-white font-mont p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h1 className="text-[16px]">More info</h1>
            <div className="grid grid-cols-2 mt-4">
                <p className="text-[14px]">Address</p>
                <span className="text-[14px]">
                    {order.shippingAddress.address} , {order.shippingAddress.locality} , { order.shippingAddress.city} , {String(order.shippingAddress.pincode)} , {order.shippingAddress.state}
                </span>
            </div>
             <div className="grid grid-cols-2 mt-4">
                <p className="text-[14px]">Payment</p>
                <span className="text-[14px]">
                    {order.payment.method} , {order.payment.status}
                </span>
            </div>
            <div className="mt-4">
                <h1>Products</h1>
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {
                        order.items.map((item) => (
                            <div className="bg-white rounded p-2 text-black text-[12px] font-medium">
                                <h1 className="capitalize">{item.name}</h1>
                                <p>Quantity : {String(item.quantity)}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
});

export default OrderDetailPopup;