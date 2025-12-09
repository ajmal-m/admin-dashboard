import { memo, useCallback, useState } from "react";
import PopUp from "../pop-up-drawer";
import { cn } from "@/lib/utils";


const LoginModal = memo(( { close } : { close : () => void} ) => {
    const [phone, setPhone] = useState("");
    const isValid = useCallback((phone: string) => {
        return /^[6-9]\d{9}$/.test(phone);
    },[])

    return(
        <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white min-w-80 flex flex-col gap-4">
            <h1 className="text-[16px] text-white font-mont text-center mt-2">Log in or Sign up</h1>
            <div className="absolute top-2 right-2">
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
            </div>
            <div className="w-full flex flex-col gap-4" >
                <div className="relative bg-white rounded">
                    <span className="absolute font-normal font-mont top-[9px] left-1.5 text-[#2B2B2B]">+91</span>
                    <input
                        type="number"
                        maxLength={10}
                        id="mobile"
                        name="mobile"
                        className="border border-white text-heading text-sm outline-none rounded-base block 
                        w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black pl-9"
                        placeholder="Enter mobile number"
                        required
                        value={phone}
                        onChange={(e ) => setPhone(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className={cn(`text-black border bg-[white] border-transparent 
                        hover:bg-brand-strong shadow-xs leading-5 rounded text-sm px-4 py-2.5 w-full
                        font-mont h-10 flex items-center justify-center
                    ` , isValid(phone) ? "cursor-pointer" : "bg-[#9c9c9c] text-white" )}
                >
                    Continue
                </button>
           </form>
        </div>
    )
})



const LoginPopup  = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        <p className="text-[16px] text-black font-mont font-medium cursor-pointer" onClick={() => setIsOpen(true)}>Login</p>
        <PopUp
            model={(close) => (
               <LoginModal close={close}/>
            )}
            keyProp={'login-number'}
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
        />
        </>
    )
});

export default LoginPopup;