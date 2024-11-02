"use client";

import { CategoryCard } from "./CategoryCard";
import React from "react";
import Slider from "react-slick";

/**
 * `CategoriesSwiper` is a component that renders a Swiper carousel to display category cards.
 *
 * - It is fully responsive and adjusts the number of visible slides based on the viewport width.
 * - Includes pagination and navigation features.
 *
 * @param {Array} categories - An array of category objects to display in the Swiper.
 */

export function CategoriesSwiper({ categories }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-24">
      <div className="slider-container">
        <Slider {...settings}>
          {categories.categories &&
            categories.categories.map((category) => (
              <CategoryCard {...category} key={category.id} />
            ))}
        </Slider>
      </div>
    </div>
  );
}
