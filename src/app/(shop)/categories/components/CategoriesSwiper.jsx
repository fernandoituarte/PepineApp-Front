"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { CategoryCard } from "./CategoryCard";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { getAllCategories } from "@/store/reducer/categories/categories";
import { ErrorComponent, Spinner } from "@/components";

/**
 * `CategoriesSwiper` is a component that renders a Swiper carousel to display category cards.
 *
 * - It is fully responsive and adjusts the number of visible slides based on the viewport width.
 * - Includes pagination and navigation features.
 *
 * @param {Array} categories - An array of category objects to display in the Swiper.
 */

export function CategoriesSwiper() {
  const dispatch = useAppDispatch();
  const { loading, error, categories } = useAppSelector(
    (state) => state.category,
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const settings = {
    dots: true,
    arrows: false,
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
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorComponent text={error} />;
  }

  return (
    <div className="mb-24 w-full">
      <div className="slider-container">
        <Slider {...settings}>
          {categories &&
            categories.map((category) => (
              <CategoryCard {...category} key={category.id} />
            ))}
        </Slider>
      </div>
    </div>
  );
}
