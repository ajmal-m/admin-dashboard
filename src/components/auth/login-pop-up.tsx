import { memo, useCallback, useState } from "react";
import PopUp from "../pop-up-drawer";
import { cn } from "@/lib/utils";


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



const LoginModal = memo(( { close } : { close : () => void} ) => {
    const [data, setData] = useState({
        email:"",
        password:''
    });
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
            <LoginSection/>
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