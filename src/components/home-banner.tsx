import { memo } from "react";
import GroceryItems from '../assets/Grocery Iteam 1.svg';


const HomeBanner = memo(() => {
    return(
        <section className="w-full min-h-[408px] bg-[#0B6434] dark:bg-[#0B6434] px-10 flex items-center justify-between max-[964px]:flex-col pt-6 max-[992px]:px-4">
            <div className="flex flex-col max-[964px]:items-center max-[964px]:text-center">
                <h1
                    className="font-mont text-[24px] font-bold text-white leading-[150.2%] tracking-[4%] uppercase  max-[964px]:w-full max-[400px]:text-[20px] max-[400px]:leading-[150%]"
                >
                    Healthy and Fresh Grocery
                </h1>
                <p className="mt-2.5 text-[#F5F5F5] text-[16px] font-mont leading-[150.2%] font-normal max-w-[421px] uppercase">
                    We pride ourselves on providing a curated 
                    of the finest, nutrient-rich products that 
                    cater to your health conscious lifestyle.
                </p>
                <button 
                    className="py-2 px-3 bg-[#FFFFFF] dark:bg-[#FFFFFF] rounded-[5px] 
                    mt-[34px] uppercase cursor-pointer  max-[400px]:mt-[18px]
                    max-[400px]:h-10 transition-all text-[#0B6434]  duration-300 ease-in-out border border-transparent hover:bg-[#0B6434] hover:text-white hover:border hover:border-white" type="button"
                >
                    <span className="text-[16px] font-semibold uppercase leading-[150.2%]  max-[400px]:text-[16px]">Learn more</span>
                </button>
            </div>
            <div>
                <img src={GroceryItems} alt="grocery-items-image" loading="lazy"/>
            </div>
        </section>
    )
});

export default HomeBanner;