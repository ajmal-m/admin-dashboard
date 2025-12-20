import { memo, useCallback } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeOrderSuccessPopUp } from "@/redux/features/popup";
import { useNavigate, useSearchParams } from "react-router";

const OrderModal = memo(() => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const isOpen = useSelector((store: RootState) => store.popup.orderSuccessPopUp);
    const dispatch = useDispatch<AppDispatch>();
    const closePopUp = useCallback(() => {
        dispatch(closeOrderSuccessPopUp());
    },[]);

    const redirectToOrder = useCallback(() => {
        const orderId = params.get("id");
        if(!orderId) return;
        dispatch(closeOrderSuccessPopUp());
        setTimeout(() => {
            navigate(`/order/${orderId}`);
        }, 400);
    },[params , dispatch , navigate ])
    return(
        <>
        {
            isOpen && (
                <div className="fixed inset-0 top-0 h-screen w-full bg-black/90 flex items-center justify-center z-50">
                    <div className="min-w-100 min-h-30 bg-white rounded py-6 flex flex-col gap-2 items-center justify-center relative">
                        <div className="absolute top-2 right-2 cursor-pointer">
                            <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            onClick={closePopUp}
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18 17.94 6M18 18 6.06 6"
                            />
                            </svg>
                        </div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbOphQI9Igj8AWWJiPNsSbRmQmKy82WOHhGg&s" className="w-20 h-20" loading="lazy" alt="" />
                        <h1 className="text-[16px] text-black font-mont font-medium">Order Placed Successfully</h1>
                        <Button
                            className={
                                cn("bg-green-800 rounded font-mont cursor-pointer hover:bg-green-900 text-[12px]")
                            }
                            onClick={redirectToOrder}
                        >
                            Track your order
                        </Button>
                    </div>
                </div>
            )
        }
        </>
        
    )
});

export default OrderModal;