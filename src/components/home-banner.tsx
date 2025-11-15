import { memo } from "react";
import GroceryItems from '../assets/Grocery Iteam 1.svg';


const HomeBanner = memo(() => {
    return(
        <section className="w-full h-[408px] bg-[#0B6434] dark:bg-[#0B6434] px-10 flex items-center justify-between">
            <div >
                <h1
                    className="font-mont text-[36px] font-bold text-white leading-[150.2%] tracking-[4%] max-w-[400px] uppercase"
                >
                    Healthy and Fresh Grocery
                </h1>
                <p className="mt-2.5 text-[#F5F5F5] text-[16px] font-mont leading-[150.2%] font-normal max-w-[421px] uppercase">
                    We pride ourselves on providing a curated 
                    of the finest, nutrient-rich products that 
                    cater to your health conscious lifestyle.
                </p>
                <button className="w-[200px] h-[60px] bg-[#FFFFFF] dark:bg-[#FFFFFF] rounded-[5px] mt-[34px] uppercase cursor-pointer" type="button">
                    <span className="text-[#0B6434] text-[24px] font-semibold uppercase leading-[150.2%]">Learn more</span>
                </button>
            </div>
            <div>
                <img src={GroceryItems} alt="grocery-items-image" />
            </div>
        </section>
    )
});

export default HomeBanner;