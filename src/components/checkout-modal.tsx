import { memo, useCallback, useState } from "react";
import PopUp from "./pop-up-drawer";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeCheckOutPopUp } from "@/redux/features/popup";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { indianStates } from "@/const/indian-states";

const steps = [
    "Shipping Address",
    // "Shipping Method",
    "Payment Method",
    "Order Summary"
]



const ShippingAddressForm = memo(() => {
    return(
        <>
        <form >
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
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">Mobile Number</label>
                    <input 
                        type="text" 
                        name="name" id="name"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter mobile number"
                    />
                </div>
                 <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">Pin Code</label>
                    <input 
                        type="text" 
                        name="name" id="name"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter pin  code"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">Locality</label>
                    <input 
                        type="text" 
                        name="name" id="name"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter pin  code"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">City / District / Town</label>
                    <input 
                        type="text" 
                        name="name" id="name"   
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
                        placeholder="Enter pin  code"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-[12px] font-mont font-normal">State</label>
                    <select
                        name="state" id="state"
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                        " 
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
                    ></textarea>
                </div>
            </div>
        </form>
        </>
    )
});

const PaymentMethods = memo(() => {
    return(
        <div className="flex flex-col gap-4 self-start">
            <p className="text-[12px] text-white font-medium font-mont">Payment Methods</p>
            <div className="flex items-center gap-2">
                <input type="radio" name="" id="" />
                <label htmlFor="cod" className="text-[12px] text-white font-medium font-mont">Cash on Delivery</label>
            </div>
            <p className="text-blue-900 bg-white rounded-full text-center px-2 py-1 max-w-50 text-[12px]">More option will come</p>
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
    },[])
    return(
        <div className="min-w-200 min-h-100 bg-green-800 rounded p-6">
            <div className="w-full bg-white h-3 rounded-full overflow-hidden">
                <div 
                    className={cn("transition-all duration-450 ease", "bg-green-500 h-full rounded-full")} 
                    style={ {width:`${100*(step+1)/steps.length}%`} }
                />
            </div>
            <h1 className="text-white font-mont font-bold text-[16px] text-center mt-2">{step+1} of {steps.length} Steps</h1>
            <div >
                { step === 0 && <ShippingAddressForm/> }
                { step === 1 && <PaymentMethods/> }
                { step === 2 && <div>Step 3</div> }
                { step === 3 && <div>Step 4</div> }

            </div>
            <div className="w-full flex justify-between mt-3">
                <Button 
                    onClick={prevStep} disabled={step==0}  
                    className={cn(
                        'rounded bg-white border text-black font-mont hover:bg-white' ,
                        'cursor-pointer'
                    )}
                >
                    Previous
                </Button>
                <Button 
                    onClick={nextStep} disabled={step == steps.length-1}
                    className={cn(
                        'rounded bg-white border text-black font-mont hover:bg-white' ,
                        'cursor-pointer'
                    )}
                >
                    Next
                </Button>
            </div>

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