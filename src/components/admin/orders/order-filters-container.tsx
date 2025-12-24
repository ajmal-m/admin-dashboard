import { memo, useCallback } from "react";
import MultiCheckBoxSelector from "../multi-checkbox-selector";
import { ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { updateOrderStatus, updatePaymentStatus } from "@/redux/features/admin/order-table-filters";


const OrderStatusSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const orderStatuses = useSelector((store : RootState) => store.orderTableFilters.orderStatus);
    const updateState = useCallback(( orderStatuses : string[]) => {
        dispatch(updateOrderStatus({ orderStatus :  orderStatuses  }));
    },[])
    return(
        <>
            <MultiCheckBoxSelector
                options={ORDER_STATUS_OPTIONS}
                label="Select Order Status"
                updateState={updateState}
                id="multi-check-box-order"
                currentData={orderStatuses}
            />
        </>
    )
});

const PaymentStatusSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const paymentStatuses = useSelector((store : RootState) => store.orderTableFilters.paymentStatus);
    const updateState = useCallback(( paymentStatus : string[]) => {
        dispatch(updatePaymentStatus({ paymentStatus :  paymentStatus  }));
    },[])
    return(
        <>
            <MultiCheckBoxSelector
                options={PAYMENT_STATUS_OPTIONS}
                label="Select Payment Status"
                updateState={updateState}
                id="multi-check-box-payment"
                currentData={paymentStatuses}
            />
        </>
    )
});

const OrderFiltersContainer = memo(() => {
    return(
        <div className="flex justify-end items-center gap-2">
            <PaymentStatusSelector/>
            <OrderStatusSelector/>
        </div>
    )
});

export default OrderFiltersContainer;