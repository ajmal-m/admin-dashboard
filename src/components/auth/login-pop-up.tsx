import { memo, useCallback, useState } from "react";
import PopUp from "../pop-up-drawer";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { isValidEmail } from "@/utils/utils";
import { useSendOTPtoEmail } from "@/api/otp/send-otp";
import { useVerifyOTP } from "@/api/otp/verify-otp";
import {  toast } from 'react-toastify';


const LoginSection = memo(() => {
    const [data, setData] = useState({ email:"", password:""});
    const updateData = useCallback((e : React.ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setData((prevData) => ({ ...prevData , [name] : value }));
    },[]);

    const handleLogin = useCallback(( e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data)
    },[data])
    return(
         <form className="w-full flex flex-col gap-4"  onSubmit={handleLogin} >
            <div>
                <label htmlFor="email" className="text-[14px] font-mont font-normal">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                   className="border border-white text-heading text-sm outline-none rounded-base block 
                    w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black"
                    placeholder="Enter email address"
                    required
                    value={data.email}
                    onChange={updateData}
                />
            </div>
            <div>
                <label htmlFor="email" className="text-[14px] font-mont font-normal">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="border border-white text-heading text-sm outline-none rounded-base block 
                    w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black"
                    placeholder="Enter password"
                    required
                    value={data.password}
                    onChange={updateData}
                />
            </div>
            <button
                type="submit"
                className={cn(`text-black border bg-[white] border-transparent 
                    hover:bg-brand-strong shadow-xs leading-5 rounded text-sm px-4 py-2.5 w-full
                    font-mont h-10 flex items-center justify-center
                ` , data.email && data.password && 'cursor-pointer' )}
                disabled={!data.email || !data.password}
            >
                Continue
            </button>
        </form>
    )
})

const SignUpSection = memo(() => {

    const [ openOTP, setOpenOTP] = useState<boolean>(false);
    const [ emailVerified, setEmailVerified] = useState<boolean>(false);
    const [data, setData] = useState({
        email:'',
        otp:'',
        password:'',
        cpassword:''
    });

    const otpSendMutation = useSendOTPtoEmail({
        onSuccess:() => {
            setOpenOTP(true);
            toast.success("OTP has been sent to your email. Please enter it below to verify your account");
        }
    });
    const otpVerifyMutation = useVerifyOTP({
        onSuccess:() => {
            setOpenOTP(false);
            setEmailVerified(true);
            toast.success("OTP verified successfully.")
        },
        onError:() => {
            toast.error("Invalid OTP. Please try again.")
        }
    });

   

    const updateData = useCallback(( e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevData) => ({ ...prevData, [name] : value}))
    },[]);

    const sendOtpToEmailAddress = useCallback(() => {
        if(emailVerified) return;
        otpSendMutation.mutate({ email : data?.email });
    },[data , emailVerified]);

    const verifyEmailByOTP = useCallback(() => {
        otpVerifyMutation.mutate({ email : data?.email , otp: data?.otp});
    },[data]);


    const handleSignUp = useCallback((e : React.FormEvent) => {
        e.preventDefault();
        console.log(data);
    },[])
    return(
        <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}   >
            <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[14px] font-mont font-normal">Email</label>
                <div className="bg-white rounded relative">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="
                            border border-white text-heading text-sm outline-none rounded-base block 
                            w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black
                            pr-[63px]
                        "
                        placeholder="Enter email address"
                        required
                        value={data.email}
                        onChange={updateData}
                        readOnly={emailVerified}
                    />
                    {
                        isValidEmail(data.email) && (
                            <button 
                                className="
                                    absolute bg-green-900 top-2 right-2 
                                    text-[12px] px-2 py-1 rounded font-mont
                                " 
                                onClick={() => sendOtpToEmailAddress()}
                                type="button" 
                            >
                                {
                                    otpSendMutation.isPending ? "Sending OTP" : emailVerified ? "Verified" : "Verify"
                                }
                            </button>
                        )
                    }
                    
                </div>
            </div>
            {
                otpSendMutation.isSuccess && openOTP && (
                    <div className="bg-white rounded relative transition-all duration-300 ease-in">
                        <input
                            type="number"
                            id="otp"
                            name="otp"
                            className="
                                border border-white text-heading text-sm outline-none rounded-base block 
                                w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black"
                            placeholder="OTP"
                            required
                            value={data.otp}
                            onChange={updateData}
                        />
                        <button
                            type="button" 
                            className="
                                absolute bg-green-900 top-2 right-2 
                                text-[12px] px-2 py-1 rounded font-mont
                            " 
                            onClick={verifyEmailByOTP} 
                        >
                            {
                                otpVerifyMutation.isPending ? "Verifying OTP" : "verify OTP"
                            }
                        </button>
                    </div>
                )
            }
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-[14px] font-mont font-normal">Password</label>
                <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    className="border border-white text-heading text-sm outline-none rounded-base block 
                    w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black"
                    placeholder="Enter password"
                    required
                    value={data.cpassword}
                    onChange={updateData}
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-[14px] font-mont font-normal">Confirm Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="border border-white text-heading text-sm outline-none rounded-base block 
                    w-full px-3 py-2.5 shadow-xs placeholder:text-body font-mont rounded bg-white text-black"
                    placeholder="Enter password"
                    required
                    value={data.password}
                    onChange={updateData}
                />
            </div>
            <Button
                className={
                    cn("text-black bg-white font-mont hover:text-white" , !openOTP && 'cursor-pointer')
                }
                disabled={ !emailVerified || !isValidEmail(data.email) || !data.password || data.password !== data.cpassword }  
            >Login</Button>
        </form>
    )
});



const LoginModal = memo(( { close } : { close : () => void} ) => {
    const [showLogin, setShowLogin] = useState<boolean>(true);
    return(
        <div className="relative bg-green-800 rounded shadow-sm p-4 md:p-6 font-mont text-white flex flex-col gap-4 min-w-[358px]">
            <h1 className="text-[16px] text-white font-mont text-center mt-2">
                { showLogin ? "Login Account" : "Sign Up Account"}
            </h1>
            <div className="absolute top-2 right-2 cursor-pointer">
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
            {
                showLogin ? (<LoginSection/>) : (<SignUpSection/>)
            }
            {
                showLogin ? (
                    <p className="text-[12px] font-mont text-center">
                        You don't have an account? 
                        <span 
                            className="text-blue-200 underline text-[10px] cursor-pointer ml-1" 
                            onClick={() => setShowLogin(false)}
                        >
                            Create one by clicking here.
                        </span>
                    </p>
                ):(
                    <p className="text-[12px] font-mont text-center"> 
                        Already have an account?
                        <span 
                            className="text-blue-200 underline text-[10px] cursor-pointer ml-1" 
                            onClick={() => setShowLogin(true)}
                        >
                            Click here to sign in
                        </span>
                    </p>
                )
            }
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