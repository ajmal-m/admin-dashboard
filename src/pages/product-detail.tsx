import { useGetProductsById } from "@/api/product/get-product-by-id";
import SimilarProducts from "@/components/similar-products";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { AppDispatch, RootState } from "@/redux/store";
import type { Product } from "@/type/type";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {  Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateCart } from "@/redux/features/cartSlice";




const AddToCartButton = memo((
    { product } : { product : Product }
) => {
    const { productQuantity } = useSelector((store : RootState ) => store.cart);
    const [selectedQuantity, setSelectedQuantity] = useState(productQuantity[product._id] ?? 0);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setSelectedQuantity(productQuantity[product._id] ?? 0);
    },[productQuantity, product])

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
        <>
         {
            selectedQuantity > 0 ? (
                <button
                    className="
                        bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                        max-w-50 self-end px-3 cursor-pointer capitalize min-w-25"
                >
                    <div className="w-full grid grid-cols-3 gap-1">
                        <div className="flex justify-end">
                            <span className="cursor-pointer text-end" onClick={() =>  updateQuantity("-")} >-</span>
                        </div>
                        <span className="font-mont">{selectedQuantity}</span>
                        <div className="flex justify-start">
                            <span className="cursor-pointer text-justify" onClick={() =>  updateQuantity("+")}>+</span>
                        </div>
                    </div>
                </button>
            ) : (
                <button
                    className="
                        bg-[#0d542b] text-white rounded py-2 font-mont font-medium 
                        max-w-50 self-end px-3 cursor-pointer min-w-25 capitalize"
                    type="button"
                    onClick={() =>  updateQuantity("+")}
                >
                    Add To Cart
                </button>
            )
        }
        </>
    )
});


const ProductImagePreview = memo((
    { product }:
    { product : Product}
) => {

    const imageRef = useRef<HTMLImageElement | null>(null);
    const handleMouseMove = useCallback((e : React.MouseEvent<HTMLDivElement> ) => {
        const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        e.currentTarget.style.cursor ='zoom-in'

        if (imageRef.current) {
            imageRef.current.style.transformOrigin = `${x}% ${y}%`;
            imageRef.current.style.transform = "scale(3)";
        }
    },[imageRef]);

    const handleMouseLeave = useCallback(() => {
        if(imageRef.current){
            imageRef.current.style.transform = "scale(1)";
            imageRef.current.style.transformOrigin = "center";
        }
    },[imageRef])


    return(
        <div 
            id="preview-image-wrapper" 
            className="w-120 h-120 overflow-hidden transition-all duration-300 ease-in" 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img 
                ref={imageRef}
                src={product.image.secure_url}
                alt={product.name}
                className="w-[480px] h-[480px] object-contain"
                id="preview-image"
            />
        </div>
    )
});



const ProductDetail = memo(() => {
    const {pId} = useParams();
    const getProductByIdMutation = useGetProductsById({ id : pId as string});
    if(getProductByIdMutation.isLoading){
         return <div className="flex justify-center min-h-screen pt-5">
             <Oval
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                strokeWidth='2'
                animationDuration='1.5'
            />
        </div>
    }

    const product : Product = getProductByIdMutation?.data?.data?.data ?? {} as Product;
    
    return(
        <section className="min-h-screen px-10 max-[992px]:px-4 mt-4">
            <div className="flex items-center justify-center gap-6 max-[800px]:flex-col">
                <ProductImagePreview product={product}/>
                <div 
                    className="
                        flex flex-col self-start pt-[60px] gap-4 max-[800px]:self-center 
                        max-[800px]:pt-0 max-[800px]:w-full max-[800px]:gap-1
                    "
                >
                    <h2 className="text-[24px] font-mont font-medium capitalize">{product.name}</h2>
                    <div className="flex items-center justify-between gap-10">
                        <p className="text-[24px] font-mont font-bold">₹ {product.price}</p>
                        <div className="flex items-center gap-2">
                            <span className="text-[#2B2B2B] font-mont font-medium">MRP <span className="line-through">{ Math.floor(product.price*1.1)}</span></span>
                            <Badge className={cn("bg-blue-500 text-white px-2 py-1 rounded font-month font-medium")}>10% off</Badge>
                        </div>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </div>
            <SimilarProducts  product={product}/>
        </section>
    )
});

export default ProductDetail;