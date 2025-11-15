import { memo } from "react";
import CategorySwiper from "./category-swiper";

const CategorySection = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-[30px] max-[400px]:px-4">
            <h2 className="text-[32px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px]">CATEGORY</h2>
            <CategorySwiper/>
        </section>
    )
});

export default CategorySection;