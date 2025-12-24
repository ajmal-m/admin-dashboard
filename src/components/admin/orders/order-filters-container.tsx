import { memo, useCallback } from "react";
import MultiCheckBoxSelector from "../multi-checkbox-selector";
import { ADMIN_ORDER_SORT_OPTIONS, ORDER_STATUS_OPTIONS, PAYMENT_STATUS_OPTIONS } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { clearFilters, updateOrderStatus, updatePaymentStatus, updateSort } from "@/redux/features/admin/order-table-filters";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


const OrderStatusSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const orderStatuses = useSelector((store : RootState) => store.orderTableFilters.orderStatus);
    console.log("Current Data : ", orderStatuses);
    const updateState = useCallback(( orderStatuses : string[]) => {
        dispatch(updateOrderStatus({ orderStatus :  orderStatuses , page:1  }));
    },[dispatch]);
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
        dispatch(updatePaymentStatus({ paymentStatus :  paymentStatus , page : 1 }));
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

const SortSelector = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const sort = useSelector((store: RootState) => store.orderTableFilters.sort);
    const changeSort = useCallback(( e : React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(updateSort({sort : e.target.value , page:1 }));
    },[]);
    return(
         <select 
            name="sort-order" id="sort-order"
            className={cn(
                "rounded border border-green-900 font-mont",
                "bg-green-800 text-white cursor-pointer px-4 py-2 text-[12px]"
            )}
            onChange={changeSort}
            value={sort || ""}
        >
            <option value="">Select Sort</option>
            {
                ADMIN_ORDER_SORT_OPTIONS.map((option) => (
                    <option value={option.value} key={option.name}>{option.name}</option>
                ))
            }
        </select>
    )
});

const ClearAllFilters = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    return(
        <Button
            className={
                cn(
                    "bg-green-900 text-white rounded",
                    "font-mont text-[12px] font-normal",
                    "cursor-pointer"
                )
            }
            onClick={() => dispatch(clearFilters())}
        >
            Clear All Filters
        </Button>
    )
});

const OrderFiltersContainer = memo(() => {
    return(
        <div className="flex justify-end items-center gap-2">
            <SortSelector/>
            <PaymentStatusSelector/>
            <OrderStatusSelector/>
            <ClearAllFilters/>
        </div>
    )
});

export default OrderFiltersContainer;