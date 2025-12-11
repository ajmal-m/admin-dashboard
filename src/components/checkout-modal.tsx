import { memo } from "react";
import PopUp from "./pop-up-drawer";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { closeCheckOutPopUp } from "@/redux/features/popup";


const CheckOutModal = memo((
    { close }: {
        close : () => void
    }
) => {
    return(
        <div className="w-20 h-10 bg-red-500">
            <button onClick={close}>close</button>
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