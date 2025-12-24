import { memo, useCallback } from "react";
import MultiCheckBoxSelector from "../multi-checkbox-selector";
import { ORDER_STATUS_OPTIONS } from "@/utils/utils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { updateOrderStatus } from "@/redux/features/admin/order-table-filters";


const OrderStatusSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const updateState = useCallback(( orderStatuses : string[]) => {
        dispatch(updateOrderStatus({ orderStatus :  orderStatuses  }));
    },[])
    return(
        <>
            <MultiCheckBoxSelector
                options={ORDER_STATUS_OPTIONS}
                label="Select Order Status"
                updateState={updateState}
            />
        </>
    )
});


const OrderFiltersContainer = memo(() => {
    return(
        <div className="flex justify-end items-center">
            <OrderStatusSelector/>
        </div>
    )
});

export default OrderFiltersContainer;