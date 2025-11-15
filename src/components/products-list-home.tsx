import { memo } from "react";
import ProductImage from '../assets/Image.svg'

const Products = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-[30px] max-[400px]:px-4 max-[400px]:mt-4">
            <h2  className="text-[32px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px]">ALL PRODUCTS</h2>
            <div className="mt-[30px] flex items-center flex-wrap gap-7">
                {
                    new Array(20).fill(0).map((_,i) => (
                        <div className="w-[319px] h-[418px] border border-[#0B6434] rounded flex flex-col items-center justify-center gap-4" key={i}>
                            <img src={ProductImage} alt="product-image"/>
                            <h3 className="text-[24px] font-mont text-[#000000]">Cabbage</h3>
                            <h3 className="text-[24px] font-mont text-[#000000]">1kg</h3>
                            <h3 className="text-[24px] font-mont text-[#000000]">৳70.00</h3>
                            <button
                                className="w-[154px] h-11 bg-[#0B6434] text-[#FFFFFF] rounded-[5px]"
                            >
                                <span className="text-[20px] font-mont text-[#FFFFFF]">Add to Cart</span>
                            </button>
                        </div>
                    ))
                }
            </div>
        </section>
    )
});

export default Products;