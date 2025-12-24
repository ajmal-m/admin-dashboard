import { memo, useCallback, useEffect, useState } from "react";
import type { Product } from "@/type/type";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/redux/store";
import { updateCart } from "@/redux/features/cartSlice";



const ProductCard = memo(({ product }:{ product: Product}) => {
    
    const dispatch = useDispatch<AppDispatch>();
    const {productQuantity} = useSelector((store : RootState ) => store.cart);
    const [selectedQuantity, setSelectQuantity] = useState( productQuantity[product._id] ?? 0);

    useEffect(() => {
        setSelectQuantity(productQuantity[product._id] ?? 0)
    },[productQuantity , product])

    const updateQuantity = useCallback((type : string) => {
        try {
            let newQuantity;
            if(type === "+"){
                newQuantity = selectedQuantity+1;
            }else{
                if(selectedQuantity === 1){
                    newQuantity = 0;
                }else{
                    newQuantity = selectedQuantity-1;
                }
            }
            dispatch(updateCart(
                {
                    product,
                    quantity: newQuantity
                }
            ));
        } catch (error) {
            console.log(error);
        }
    },[selectedQuantity]);

    return(
        <div className="
            min-w-[120px] max-h-[418px] border border-[#0B6434] 
            rounded flex flex-col items-start justify-center gap-1
            py-3 text-[12px] px-2 shadow dark:bg-green-900
        "
        >
            <div className="w-full">
                <Link to={`/pd/${product._id}`}>
                    <div className="h-[153px] w-full flex items-center justify-center">
                        <img src={product.image.secure_url} alt="product-image" loading="lazy" className="max-h-[153px]"/>
                    </div>
                    <h3 className="text-[16px] font-mont max-[400px]:text-[16px] font-medium capitalize">{product.name}</h3>
                    <div className="w-full flex items-center justify-between">
                        <p className="font-mont text-[16px] font-bold">₹{product.price}</p>
                        <p className="font-mont text-[16px] items-left font-medium">1 Kg</p>
                    </div>
                </Link>
            </div>
            <div className="w-full flex items-center justify-between">
                {
                    selectedQuantity > 0 ? (
                        <button
                            className="w-full h-8 flex items-center justify-center bg-[#0B6434] rounded-[5px] font-mont text-[16px] font-semibold"
                            type="button"
                        >
                            <div className="w-full grid grid-cols-3 gap-1">
                                <div className="flex justify-end">
                                    <span className="cursor-pointer text-end text-white" onClick={() => updateQuantity("-")}>-</span>
                                </div>
                                <span className="font-mont text-white">{selectedQuantity}</span>
                                <div className="flex justify-start">
                                    <span className="cursor-pointer text-justify text-white" onClick={() => updateQuantity("+")}>+</span>
                                </div>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="w-full h-8 flex items-center justify-center border border-[#0B6434] 
                            rounded-[5px] cursor-pointer font-mont text-[16px] font-semibold"
                            type="button"
                            onClick={() => updateQuantity("+")}
                        >
                            Add
                        </button>
                    )
                }
                
            </div>
        </div>
    )
});

export default ProductCard;