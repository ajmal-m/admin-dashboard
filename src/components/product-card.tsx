import { memo, useCallback, useState } from "react";
import ProductImage from '../assets/Image.svg';


type ProductType={
    id:string,
    name:string,
    image:any,
    quantityType:string,
    categoryId:string,
    quantity:number,
    price:number
}


const ProductCard = memo(({ product }:{ product: ProductType}) => {
    const [selectedQuantity, setSelectQuantity] = useState(0);

    const updateQuantity = useCallback((type : string) => {
        try {
            if(type === "+"){
                setSelectQuantity(q => q+1);
            }else{
                if(selectedQuantity === 1){
                    setSelectQuantity(0);
                }else{
                    setSelectQuantity(q => q-1);
                }
            }
        } catch (error) {
            console.log(error);
        }
    },[selectedQuantity]);

    return(
        <div className="
            min-w-[120px] max-h-[418px] border border-[#0B6434] 
            rounded flex flex-col items-start justify-center gap-1
            py-3 text-[12px] px-2
        "
        >
            <img src={ProductImage} alt="product-image" loading="lazy"/>
            <h3 className="text-[24px] font-mont text-[rgb(0,0,0)] max-[400px]:text-[16px]">{product.name}</h3>
            <div className="w-full flex items-center justify-between">
                <p className="font-mont text-[#000000] text-[20px] min-[600px]:text-[24px]">₹{product.price}</p>
                <p className="font-mont text-[#000000] text-[12px] min-[600px]:text-[17px] items-left">{product.quantityType}</p>
            </div>
            <div className="w-full flex items-center justify-between">
                {
                    selectedQuantity > 0 ? (
                        <button
                            className="w-full h-8 flex items-center justify-center bg-[#0B6434] text-white rounded-[5px] font-mont text-[16px] font-semibold"
                            type="button"
                        >
                            <div className="w-full grid grid-cols-3 gap-1">
                                <span className="cursor-pointer text-end" onClick={() => updateQuantity("-")}>-</span>
                                <span>{selectedQuantity}</span>
                                <span className="cursor-pointer text-justify" onClick={() => updateQuantity("+")}>+</span>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="w-full h-8 flex items-center justify-center bg-[white] text-[#0B6434] border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[16px] font-semibold"
                            type="button"
                            onClick={() => updateQuantity("+")}
                        >
                            ADD
                        </button>
                    )
                }
                
            </div>
        </div>
    )
});

export default ProductCard;