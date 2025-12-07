import { memo } from "react";
import CategorySwiper from "./category-swiper";

const CategorySection = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-[30px] max-[992px]:px-4 max-[400px]:mt-4">
            <h2 className="text-[24px] font-semibold text-[#000000] font-mont max-[400px]:text-[24px] capitalize">Categories</h2>
            <CategorySwiper/>
        </section>
    )
});

export default CategorySection;