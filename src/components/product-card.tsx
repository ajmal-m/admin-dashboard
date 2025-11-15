import { memo } from "react";
import ProductImage from '../assets/Image.svg'

const ProductCard = memo(() => {
    return(
        <div className="
            w-[319px] max-[400px]:w-[170px] max-h-[418px] border border-[#0B6434] 
            rounded flex flex-col items-center justify-center gap-4 max-[400px]:gap-px
            py-3 max-[400px]:text-[12px]

        "
        >
            <img src={ProductImage} alt="product-image" loading="lazy"/>
            <h3 className="text-[24px] font-mont text-[#000000]">Cabbage</h3>
            <p className="text-[24px] font-mont text-[#000000]">1kg</p>
            <p className="text-[24px] font-mont text-[#000000]">₹ 70.00</p>
            <button
                className="w-[154px] h-11 bg-[#0B6434] text-[#FFFFFF] rounded-[5px]"
            >
                <span className="text-[20px] font-mont text-[#FFFFFF]">Add to Cart</span>
            </button>
        </div>
    )
});

export default ProductCard;