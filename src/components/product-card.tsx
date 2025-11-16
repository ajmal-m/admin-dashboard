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
            <h3 className="text-[24px] font-mont text-[#000000]">{product.name}</h3>
            <p className="font-mont text-[#000000] text-[16px] min-[600px]:text-[17px] items-left">{product.quantityType}</p>
            <div className="w-full flex items-center justify-between">
                <p className="font-mont text-[#000000] text-[20px] min-[600px]:text-[24px]">₹{product.price}</p>
                {
                    selectedQuantity > 0 ? (
                        <button
                            className="min-w-22 min-h-11 px-4 py-2 bg-[#0B6434] text-white rounded-[5px] font-mont text-[16px] font-semibold"
                            type="button"
                        >
                            <div className="flex items-center justify-between gap-1">
                                <span className="cursor-pointer" onClick={() => updateQuantity("-")}>-</span>
                                <span>{selectedQuantity}</span>
                                <span className="cursor-pointer" onClick={() => updateQuantity("+")}>+</span>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="min-w-22 min-h-11 px-4 py-2 bg-[white] text-[#0B6434] border border-[#0B6434] rounded-[5px] cursor-pointer font-mont text-[16px] font-semibold"
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