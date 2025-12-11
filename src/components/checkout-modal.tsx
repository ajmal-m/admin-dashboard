import { memo, useCallback, useState } from "react";
import PopUp from "./pop-up-drawer";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeCheckOutPopUp } from "@/redux/features/popup";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const steps = [
    "Shipping Address",
    "Shipping Method",
    "Payment Method",
    "Order Summary"
]


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
        <div className="min-w-200 min-h-100 bg-green-800 rounded p-4">
            <div className="w-full bg-white h-5 rounded overflow-hidden">
                <div 
                    className={cn("transition-all duration-450 ease", "bg-green-500 h-full")} 
                    style={ {width:`${25*step+25}%`} }
                />
            </div>
            <h1 className="text-white font-mont font-bold text-xl text-center mt-2">{step+1} of {steps.length} Steps</h1>
            <div className="self-end">
                <Button onClick={close}>X</Button>
            </div>
            <div className="w-full flex justify-between">
                 <Button onClick={prevStep} disabled={step==0}>Previous</Button>
                             <Button onClick={nextStep} disabled={step == steps.length-1}>Next</Button>
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