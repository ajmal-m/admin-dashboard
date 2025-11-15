import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CategoryImage from '../assets/Vegetables 1.svg'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


const CategorySwiper = memo(() => {
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
            new Array(10).fill(0).map((_, index) => (
                <SwiperSlide key={index}>
                    <div className="flex flex-col items-center">
                        <img src={CategoryImage} alt="item" loading="lazy" />
                        <p className="text-[24px] font-mont font-medium text-[#2B2B2B] dark:text-[#2B2B2B] uppercase">Vegetables</p>
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  );
});

export default CategorySwiper;
