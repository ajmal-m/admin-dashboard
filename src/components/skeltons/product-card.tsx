import { memo } from "react";
import { Oval } from "react-loader-spinner";


const ProductCardSkelton = memo(() => {
    return(
         <div className="
            min-w-[120px] max-h-[418px] border border-[#0B6434] 
            rounded flex flex-col items-start justify-center gap-1
            py-3 text-[12px] px-2 shadow
        "
        >
            <div className="w-full">
                <div className="h-[153px] bg-neutral-quaternary w-full flex items-center justify-center">
                    <Oval
                        visible={true}
                        height="40"
                        width="40"
                        color="#4fa94d"
                        strokeWidth='2'
                        animationDuration='1.5'
                    />
                </div>
                <h3 className="text-[16px] font-mont text-[rgb(0,0,0)] max-[400px]:text-[16px] font-medium capitalize"></h3>
                <div className="w-full flex items-center justify-between animate-pulse">
                    <p className="font-mont text-[#000000] text-[16px] font-medium"></p>
                    <p className="font-mont text-[#000000] text-[16px] items-left font-medium"></p>
                </div>
            </div>
            <div className="w-full flex items-center justify-between">
                  <button
                    className="w-full h-8 flex items-center justify-center bg-[white] text-[#0B6434] border border-[#0B6434] 
                    rounded-[5px] cursor-pointer font-mont text-[16px] font-semibold disabled"
                    type="button"
                    disabled={true}
                >
                    Add
                </button>
            </div>
        </div>
    )
});

export default ProductCardSkelton;