import { memo, useCallback, useMemo, useState } from "react";
import PopUp from "./pop-up-drawer";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeCheckOutPopUp } from "@/redux/features/popup";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { indianStates } from "@/const/indian-states";
import { updateAddress } from "@/redux/features/address";
import { updatePaymentMethod } from "@/redux/features/payment";
import { CURRENCY, DELIVERY_CHARGE } from "@/utils/utils";
import { useCreateOrder } from "@/api/order/create-order";
import type { OrderAddress, OrderPayment, PaymentMethods } from "@/type/type";
import { Oval } from "react-loader-spinner";
import { clearCart } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

const steps = [
    "Shipping Address",
    // "Shipping Method",
    "Payment Method",
    "Order Summary"
]



const ShippingAddressForm = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const address = useSelector((store: RootState) => store.address);
    const handleChange = useCallback(( e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value , name} = e.target;
        dispatch(updateAddress({ name , value}));
    },[]);

    const handleSelect = useCallback(( e : React.ChangeEvent<HTMLSelectElement>) => {
         dispatch(updateAddress({ name : e.target.name , value : e.target.value }));
    },[]);
    return(
        <>
        <form >
            <h1 className="text-white font-mont font-medium text-[14px]">Shipping Address</h1>
            <div className="grid grid-cols-3 gap-x-3 gap-y-4 text-white mt-3">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">Name</label>
                    <input 
                        type="text" 
                        name="name" id="name"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont 
                            rounded bg-white text-black
                        " 
                        placeholder="Enter name"
                        onChange={handleChange}
                        value={address.name}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="mobile" className="text-[12px] font-mont font-normal">Mobile Number</label>
                    <input 
                        type="number"
                        maxLength={10} 
                        name="mobile" id="mobile"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter mobile number"
                        onChange={handleChange}
                         value={address.mobile}
                    />
                </div>
                 <div className="flex flex-col gap-1">
                    <label htmlFor="pincode" className="text-[12px] font-mont font-normal">Pin Code</label>
                    <input 
                        type="number" 
                        name="pincode" id="pincode"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter pin  code"
                        onChange={handleChange}
                        value={address.pincode}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="locality" className="text-[12px] font-mont font-normal">Locality</label>
                    <input 
                        type="text" 
                        name="locality" id="locality"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter locality"
                        onChange={handleChange}
                        value={address.locality}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="city" className="text-[12px] font-mont font-normal">City / District / Town</label>
                    <input 
                        type="text" 
                        name="city" id="city"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter city / District / Town"
                        onChange={handleChange}
                        value={address.city}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="state" className="text-[12px] font-mont font-normal">State</label>
                    <select
                        name="state" id="state"
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        value={address.state}
                        onChange={handleSelect}
                    >
                        {
                            indianStates.map((state) => (
                                <option value={state}>{state}</option>
                            ))
                        }
                    </select>

                </div>
            </div>
            <div className="grid grid-cols-1 mt-4 text-white">
                <div className="flex flex-col gap-1">
                     <label htmlFor="address" className="text-[12px] font-mont font-normal">Address ( street / Area )</label>
                    <textarea 
                        placeholder="Write about steet or area"
                        name="address" id="address"  
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont 
                            rounded bg-white text-black
                            "
                        onChange={handleChange}
                        value={address.address}
                    ></textarea>
                </div>
            </div>
        </form>
        </>
    )
});

const PaymentMethods = memo(() => {
    const dispatch = useDispatch<AppDispatch>();
    const paymentMethod = useSelector((store: RootState) => store.payment.paymentMethod);
    const updatePayment = useCallback(( e : React.ChangeEvent<HTMLInputElement> ) => {
        dispatch(updatePaymentMethod({ value : e.target.value }));
    },[])
    return(
        <div className="flex flex-col gap-4 self-start">
            <p className="text-[14px] text-white font-medium font-mont">Payment Methods</p>
            <div className="flex items-center gap-2">
                <input 
                    type="radio" 
                    name="cod" 
                    id="cod" 
                    value='COD'
                    checked={paymentMethod === "COD"} 
                    className="w-4 h-4" 
                    onChange={updatePayment} 
                />
                <label htmlFor="cod" className="text-[12px] text-white font-medium font-mont">Cash on Delivery</label>
            </div>
            <p className="text-blue-900 bg-white rounded-full text-center px-2 py-1 max-w-50 text-[12px]">More option will come</p>
        </div>
    )
});

const PaymentSummary = memo(() => {
    const paymentMethod = useSelector((store: RootState) => store.payment.paymentMethod);
    return(
        <div className="grid grid-cols-1 gap-y-4">
            <p className="text-[12px] text-white font-mont font-normal">
                Payment Method : <span className="uppercase" >{paymentMethod}</span>
            </p>
        </div>
    )
})


const AddressSummary = memo(() => {
    const address = useSelector((state : RootState) => state.address);
    return(
        <div className="grid grid-cols-2 gap-y-4">
            <p className="text-[12px] text-white font-mont font-normal">Name : {address.name}</p>
            <p className="text-[12px] text-white font-mont">
                Mobile Number : +91 {address.mobile.toString().slice(0,3)} - {address.mobile.toString().slice(3,6)} - {address.mobile.toString().slice(6,10)}
            </p>
            <p className="text-[12px] text-white font-mont font-normal">Locality : {address.locality}</p>
            <p className="text-[12px] text-white font-mont font-normal">City : {address.city}</p>
            <p className="text-[12px] text-white font-mont font-normal">State : {address.state}</p>
            <p className="text-[12px] text-white font-mont font-normal">Address : {address.address}</p> 
        </div>
    )
});

const ProductSummary = memo(() => {
    const { cartProducts , productQuantity } = useSelector((store: RootState ) => store.cart);
    return(
        <div className="grid grid-cols-2 gap-4 pr-2">
            {
                Object.keys(productQuantity).map((productId) => (
                    <div className="w-full min-h-15 bg-white rounded py-2 px-3 flex items-center gap-4" key={productId}>
                        <img src={cartProducts[productId].image.secure_url} alt={cartProducts[productId].name} className="w-20 h-20"/>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                            <p className="text-black text-[14px] font-mont font-medium capitalize">{cartProducts[productId].name}</p>
                            <p className="text-black text-[14px] font-mont font-medium">₹{cartProducts[productId].price} <span className="text-[11px] font-mont text-blue-800">per kg</span></p>
                            <p className="text-black text-[14px] font-mont font-medium capitalize">Quantity : {productQuantity[productId]}</p>
                            <p className="text-black text-[14px] font-mont font-medium capitalize">
                                SubTotal : <span className="text-[16px] font-mont font-bold">₹{ Math.round( productQuantity[productId] *  cartProducts[productId].price ) }</span>
                            </p>

                        </div>
                    </div>
                ))
            }
        </div>
    )
});

const PaymentDetails = memo(() => {
    const { cartProducts , productQuantity } = useSelector((store : RootState) => store.cart)
    const totalPrice = useMemo(() => {
        return Object.keys(productQuantity).reduce((acc, pId) =>  acc + cartProducts[pId].price * productQuantity[pId] , 0)
    },[]);
    return(
        <div className="w-full min-h-15 bg-white rounded py-4 px-3 grid grid-cols-1 gap-y-1">
            <div className="grid grid-cols-2 gap-4 text-black text-[14px] font-mont font-medium capitalize">
                <p >Total</p>
                <span className="font-bold">₹{Math.round(totalPrice)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-black text-[14px] font-mont font-medium capitalize">
                <p >Delivery Charge</p>
                <span className="font-bold" >₹{DELIVERY_CHARGE}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-black text-[14px] font-mont font-medium capitalize">
                <p >Total Payment</p>
                <span className="font-bold" >₹{ totalPrice + DELIVERY_CHARGE}</span>
            </div>
        </div>
    )
});

const OrderSummary = memo(() => {
    return(
        <div className="flex flex-col gap-4 self-start">
            <p className="text-[14px] text-white font-medium font-mont">Order Summary</p>
            <AddressSummary/>
            <PaymentSummary/>
            <ProductSummary/>
            <PaymentDetails/>
        </div>
    )
});


const PlaceOrderButton = memo(() => {

    const { productQuantity , cartProducts} = useSelector((store: RootState) => store.cart);
    const address = useSelector((state : RootState) => state.address);
    const userId = useSelector((state : RootState  ) => state.auth.id);
    const paymentMethod = useSelector((state : RootState) => state.payment.paymentMethod);
    const createOrderMutation = useCreateOrder();
    const dispatch = useDispatch<AppDispatch>();

    const placeOrder = useCallback(( ) => {
        try {
            const orderItems = Object.keys(productQuantity).map((pId) => {
                return {
                    productId: pId,
                    name: cartProducts[pId].name,
                    price:cartProducts[pId].price ,
                    quantity: productQuantity[pId],
                    subTotal: Math.round(productQuantity[pId] * cartProducts[pId].price) ,
                }
            });
            const totalPrice = orderItems.reduce((sum, item) => ( sum + item.subTotal ),0) + DELIVERY_CHARGE;
            const payment : OrderPayment = {
                method: paymentMethod as PaymentMethods,
                status:"PENDING",
                paidAmount: totalPrice,
                currency : CURRENCY
            };


            const newOrder = {
                userId,
                items: orderItems,
                shippingAddress: address as OrderAddress,
                payment,
                grandTotal:totalPrice as number,
                orderStatus:"PLACED"
            }
            createOrderMutation.mutate(newOrder);
            dispatch(closeCheckOutPopUp());
            dispatch(clearCart());
            toast.success("Order created successfully.")
        } catch (error) {
            console.log(error);
        }
    },[]);

    return(
        <Button 
            onClick={placeOrder}
            className={cn(
                'rounded bg-white border text-black font-mont hover:bg-white' ,
                'cursor-pointer'
            )}
        >
            {
                createOrderMutation.isPending ? (
                    <div className="flex gap-2 items-center">
                        <span>
                            Processing..
                        </span>
                        <Oval
                            visible={true}
                            height="20"
                            width="20"
                            color="#4fa94d"
                            strokeWidth='5'
                            animationDuration='0.5'
                        />
                    </div>
                ) : "Place Order"
            }
        </Button>
    )
})



const ButtonGroup = memo((
    { firstStep , lastStep , nextStep , prevStep } : { 
        firstStep:boolean; 
        lastStep:boolean;
        nextStep: () => void;
        prevStep:() => void;
    }
) => {
    return(
        <div className="w-full flex justify-between mt-3">
                <Button 
                    onClick={prevStep} disabled={firstStep}  
                    className={cn(
                        'rounded bg-white border text-black font-mont hover:bg-white' ,
                        'cursor-pointer'
                    )}
                >
                    Previous
                </Button>
                {
                    ( lastStep ) ? (
                        <PlaceOrderButton/>
                    ) : (
                        <Button 
                            onClick={nextStep}
                            className={cn(
                                'rounded bg-white border text-black font-mont hover:bg-white' ,
                                'cursor-pointer'
                            )}
                        >
                            Next
                        </Button>
                    )
                }
            </div>
    )
})



const CheckOutModal = memo((
    { close }: {
        close : () => void
    }
) => {

    const [step, setStep] = useState(0);

    const nextStep = useCallback(() => {
        setStep((step) => {
            if(step === steps.length-1){
                return step;
            }
            return step+1;
        })
    },[]);

    const prevStep = useCallback(() => {
        setStep((step) => {
            if(step === 0) return 0;
            return step-1;
        })
    },[]);

    return(
        <div className="min-w-200 min-h-100 bg-green-800 rounded p-6 max-w-200 h-full relative text-white">
            <button className="text-[14px] font-mont font-medium text-white absolute top-6 right-6 cursor-pointer">
                 <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    onClick={close}
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18 17.94 6M18 18 6.06 6"
                />
                </svg>
            </button>
            <h1 className="text-center text-[14px] font-mont">{step+1} / {steps.length}</h1>
            <div className="w-full bg-white h-3 rounded-full overflow-hidden mt-6">
                <div 
                    className={cn("transition-all duration-450 ease", "bg-green-500 h-full rounded-full")} 
                    style={ {width:`${100*(step+1)/steps.length}%`} }
                />
            </div>
          
            <div className="mt-6 overflow-y-auto max-h-125" >
                { step === 0 && <ShippingAddressForm/> }
                { step === 1 && <PaymentMethods/> }
                { step === 2 && <OrderSummary/>}

            </div>
           
           <ButtonGroup 
                firstStep={step===0} 
                lastStep={step === steps.length-1} 
                nextStep={nextStep}  
                prevStep={prevStep}
            />

        </div>
    )
})


const CheckOutPopUp = memo(() => {
    const isOpen = useSelector((store: RootState) => store.popup.checkOutPopUp);
    const dispatch = useDispatch<AppDispatch>();
    return(
        <PopUp
            model={(close) => (<CheckOutModal close={close}/>)}
            keyProp='checkout-modal'
            isOpen={isOpen}
            handleClose={() => dispatch(closeCheckOutPopUp()) }
        />
    )
});

export default CheckOutPopUp;