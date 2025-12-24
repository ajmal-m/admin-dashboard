import { memo } from "react";
import CategorySwiper from "./category-swiper";

const CategorySection = memo(() => {
    return(
        <section className="px-10 mt-[30px] flex flex-col gap-6 max-[992px]:px-4 max-[400px]:mt-4 bg-light dark:bg-bluedark text-black dark:text-white">
            <h2 className="text-[24px] font-semibold font-mont max-[400px]:text-[24px] capitalize">Categories</h2>
            <CategorySwiper/>
        </section>
    )
});

export default CategorySection;