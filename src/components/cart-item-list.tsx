import { updateCart } from "@/redux/features/cartSlice";
import { openCheckOutPopUp, openLogInPopUp } from "@/redux/features/popup";
import type { AppDispatch, RootState } from "@/redux/store";
import type { cartProducts, productQuantity } from "@/type/type";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: string; 
}


const CartItemList = memo(() => {
  const { productQuantity, cartProducts} = useSelector((store : RootState) => store.cart);
  return(
    <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
      {
        Object.keys(productQuantity).map(( productKey ) => (
            <CartItem productKey={productKey} cartProducts={cartProducts} productQuantity={productQuantity} key={productKey}/>
        ))
      }
    </div>
  )
});


const CartItem = memo((
  { productKey , cartProducts , productQuantity  } : { productKey: string; cartProducts: cartProducts ; productQuantity : productQuantity }
) => {
  const [selectedQuantity , setSelectedQuantity] = useState<number>(productQuantity[productKey] ?? 0);
  const dispatch = useDispatch<AppDispatch>();

 

  useEffect(() => {
     setSelectedQuantity(productQuantity[productKey]??0);
  },[productQuantity, productKey])

  const updateQuantity = useCallback(( type : string) => {
    let newQuantity;
    if(type === '+'){
      newQuantity = selectedQuantity+1;
    }else{
      if(selectedQuantity === 1){
        newQuantity = 0;
      }else{
        newQuantity = selectedQuantity-1;
      }
    }
    dispatch(updateCart({ product : cartProducts[productKey] , quantity: newQuantity }))
  },[selectedQuantity]);

  return(
    <div className="w-full min-h-15 bg-light dark:bg-bluedark rounded py-2 px-3 flex items-center justify-between" key={productKey}>
        <div className="flex items-center gap-4">
            <div>
            <img 
              src={cartProducts[productKey].image.secure_url} alt={cartProducts[productKey].name} 
              className="w-15 h-15 object-contain"
            />
            </div>
            <div className="flex flex-col">
                <p className="text-[16px] font-mont capitalize">{cartProducts[productKey].name}</p>
                <p className=" text-[16px] font-mont capitalize font-bold">₹{cartProducts[productKey].price}</p>
            </div>
        </div>
        <div >
            <button
                className="w-20 h-8 flex items-center justify-center bg-[#0B6434] text-white 
                rounded font-mont text-[16px] px-4"
            >
                <div className="w-full grid grid-cols-3 gap-1">
                    <div className="flex justify-start">
                        <span className="cursor-pointer text-end"  onClick={() => updateQuantity('-')} >-</span>
                    </div>
                    <span>{selectedQuantity}</span>
                    <div className="flex justify-end">
                        <span className="cursor-pointer text-justify"    onClick={() => updateQuantity('+')}>+</span>
                    </div>
                </div>
            </button>
        </div>
    </div>
  )
})


const BillingDetails = memo(( ) => {
  const { productQuantity, cartProducts } = useSelector((store : RootState) => store.cart);
  const hadleCharge = 2;
  const itemTotal = useMemo(() => {
    return Object.keys(productQuantity).reduce((acc, pId) => {
      acc+= cartProducts[pId].price*productQuantity[pId];
      return acc;
    },0)
  },[productQuantity, cartProducts]);

  console.log("Item TOtal ", itemTotal)
  return(
    <div className="w-full min-h-15 bg-light dark:bg-bluedark rounded py-2 px-3 flex flex-col gap-2 mt-3">
      <h2 className=" text-[16px] font-mont font-medium">Billing Details</h2>
      <div className="grid grid-cols-2 font-mont text-[16px] text-[#2B2B2B] dark:text-light">
        <p>Items total</p>
        <p className=" font-medium">₹{itemTotal}</p>
        <p>Delivery charge</p>
        <h1 className="text-[#256FEF] font-medium"><span className="line-through text-[#787878] mr-2">₹25</span>FREE</h1>
        <p>Handling charge</p>
        <p className="font-medium">₹{hadleCharge}</p>
        <p className="font-semibold mt-3">Grand total</p>
        <p className=" font-semibold mt-3">₹{itemTotal+hadleCharge}</p>
      </div>
    </div>
  )
})


const ProceedOrderButton = memo(({ close }: { close : () => void}) => {
  const isLogged = useSelector((store: RootState) => store.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  const handleCheckOut = useCallback(() => {
    if(!isLogged){
      dispatch(openLogInPopUp());
      return
    }
    close();
    dispatch(openCheckOutPopUp());
  },[isLogged]);

  return(
    <button className="
      w-full min-h-10 bg-light dark:bg-bluedark mt-3 rounded 
    hover:bg-green-600
      cursor-pointer hover:text-white font-mont font-medium
    "
    onClick={handleCheckOut}
    >
      {
        isLogged ? ("Continue") : (
          "Login & Proceed"
        )
      }
    </button>
  )
})

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, width = "w-96" }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-screen p-4 bg-neutral-primary-soft z-50 
          transition-transform duration-300 overflow-y-auto
          ${width} max-[400px]:w-full
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          bg-green-900 border border-green-800 rounded
        `}
      >
        <div className="flex items-center justify-between">
          <h5 className="inline-flex items-center text-[24px] font-mont text-white">
            Cart Items
          </h5>

          <button
            type="button"
            onClick={onClose}
            className="text-body bg-transparent hover:text-heading hover:bg-neutral-tertiary 
            rounded-base w-9 h-9 flex items-center justify-center cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        </div>
        <CartItemList/>
        <BillingDetails/>
        <ProceedOrderButton close={onClose}/>
      </div>
    </>
  );
};

export default Drawer;
