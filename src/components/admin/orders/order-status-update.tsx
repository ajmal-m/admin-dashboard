
import { useOrderStatusUpdate } from "@/api/order/update-order-status";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Order } from "@/type/type";
import { ORDER_STATUS , PAYMENT_STATUS } from "@/utils/utils";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";


const SelectOption = memo((
    { label , name , options , value  , handleChange} : { 

        label : string ; 
        name: string;
        options: string[];
        value: string;
        handleChange: (e : React.ChangeEvent<HTMLSelectElement> ) => void;
    }
) => {
    return(
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-[12px] font-mont text-white">{label}</label>
            <select
                className="
                    border border-white text-heading text-sm outline-none rounded-base block 
                    w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black lowercase
                "  
                name={name} 
                id={name}
                value={value}
                onChange={handleChange}
            >
                {
                    options.map((val) => (
                        <option value={val} key={val} className="text-[12px] text-black lowercase">{val}</option>
                    ))
                }
            </select>
        </div>
    )
});


const OrderUpdateStatusModal = (
    { 
        close ,
        order

     }: { 
        close : () => void ;
        order:Order
    }
) => {

    const [orderStatus , setOrderStatus] = useState<string>(order.orderStatus);
    const [paymentStatus, setPaymentStatus ] = useState<string>(order.payment.status ?? "");

    const orderUpdateMutation = useOrderStatusUpdate({
        onSuccess:() => {
            toast.success("Order status updated successfully.")
            close();
        }
    });

    const updateState = useCallback(( e : React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        if(name === "orderStatus"){
            setOrderStatus(value);
        }else{
            setPaymentStatus(value);
        }
    },[]);


    const updateOrder = useCallback(() => {
        // API CALL HERE PUT UPdateg
        orderUpdateMutation.mutate({
            orderStatus,
            paymentStatus,
            id : order._id as string
        });
    },[orderStatus, paymentStatus])


    return(
        <div className="min-w-100 min-h-50 bg-green-900 rounded p-6">
            <h1 className="text-[16px] font-mont text-white">Update Order</h1>
            <div className="grid grid-cols-1 mt-4 gap-4">
                <SelectOption 
                    label="Order Status" name="orderStatus" 
                    options={ORDER_STATUS}
                    handleChange={updateState} 
                    value={orderStatus}
                />
                <SelectOption 
                    label="Payment Status" name="paymentStatus" 
                    options={PAYMENT_STATUS}
                    handleChange={updateState}
                    value={paymentStatus}
                />
                <div className="flex items-center justify-end gap-4">
                    <Button 
                        className={cn("text-black bg-white font-mont rounded hover:bg-white cursor-pointer")}  
                        onClick={close} 
                    >
                        Cancel
                    </Button>
                    <Button 
                        className={cn("text-black bg-white font-mont rounded hover:bg-white cursor-pointer")}
                        onClick={updateOrder}
                    >
                        {
                            orderUpdateMutation.isPending ? "Updating.." : "Update"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default OrderUpdateStatusModal;