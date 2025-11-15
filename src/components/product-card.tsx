import { memo } from "react";
import ProductImage from '../assets/Image.svg'

const ProductCard = memo(() => {
    return(
        <div className="
            min-w-[170px] max-h-[418px] border border-[#0B6434] 
            rounded flex flex-col items-center justify-center gap-1
            py-3 text-[12px]
        "
        >
            <img src={ProductImage} alt="product-image" loading="lazy"/>
            <h3 className="text-[24px] font-mont text-[#000000]">Cabbage</h3>
            <p className="font-mont text-[#000000] text-[16px] min-[600px]:text-[20px]">1kg</p>
            <p className="font-mont text-[#000000] text-[20px] min-[600px]:text-[24px]">₹ 70.00</p>
            <button
                className="w-[154px] h-11 bg-[#0B6434] text-[#FFFFFF] rounded-[5px]"
            >
                <span className="font-mont text-[#FFFFFF] text-[16px]">Add to Cart</span>
            </button>
        </div>
    )
});

export default ProductCard;