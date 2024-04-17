"use client";
import { useEffect } from "react";

import { Category } from "@/components";

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchCategories } from "@/store/reducer/categories/categories";

export function Categories() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="mx-auto mb-16 max-w-7xl px-6 lg:px-8">
      <ul
        role="list"
        className="mx-auto mt-20 grid max-w-2xl grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-7 gap-y-16 text-center lg:mx-0 lg:max-w-none lg:grid-cols-4 xl:grid-cols-4 justify-center"
      >
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </ul>
    </div>
  );
}
