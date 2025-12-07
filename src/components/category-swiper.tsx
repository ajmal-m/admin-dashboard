import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CategoryImage from '../assets/Vegetables 1.svg'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useGetCategories } from "@/api/category/get-category";
import type { Category } from "@/type/type";
import { Link } from "react-router";


const CategorySwiper = memo(() => {
  const getCategoryMutation = useGetCategories({});

   const categories : Category[] = getCategoryMutation.data?.data?.data ?? [];
  return (
    <div className="w-full">
      <Swiper
        modules={[ Pagination]}
        spaceBetween={5}
        breakpoints={{
            320: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
              1200: { slidesPerView: 5 },
                1300: { slidesPerView: 6 },
        }}
        pagination={{ clickable: true }}
      >


        {
          getCategoryMutation.isLoading  ? (
            <SwiperSlide key={'loading'}>
                  <div className="flex flex-col items-center justify-between">
                      <img src={CategoryImage} alt="item" loading="lazy"  className="w-[154px] h-[114px]"/>
                      <p className="text-[16px] font-mont font-medium text-[#2B2B2B] dark:text-[#2B2B2B] uppercase">Loading....</p>
                  </div>
            </SwiperSlide>
          ) : (
             categories.map((category, index) => (
                <SwiperSlide key={index}>
                  <Link to={`cd/${category._id}`}>
                    <div className="flex flex-col items-center justify-between">
                        <img src={category.image?.secure_url} alt="item" loading="lazy"  className="w-[154px] h-[114px]"/>
                        <p className="text-[16px] font-mont font-medium text-[#2B2B2B] dark:text-[#2B2B2B] uppercase">{category.name}</p>
                    </div>
                  </Link>
                </SwiperSlide>
            ))
          )
        }
      </Swiper>
    </div>
  );
});

export default CategorySwiper;
