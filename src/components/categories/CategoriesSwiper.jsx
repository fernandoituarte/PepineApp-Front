"use client";

import { CategoryCard } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

export function CategoriesSwiper({ categories }) {
  return (
    <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={20}
        pagination={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        initialSlide={2}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {categories &&
          categories.map((category) => (
            <SwiperSlide key={category.id}>
              <CategoryCard {...category} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
