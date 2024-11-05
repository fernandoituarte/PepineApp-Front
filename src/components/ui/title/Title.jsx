"use client";
import { titleFont } from "@/config/fonts";

export const Title = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mx-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-3xl font-semibold my-5`}
      >
        {title}
      </h1>
      {subtitle && (
        <h2
          className={`md:text-xl mb-5 antialiased text-justify md:text-center`}
        >
          {subtitle}
        </h2>
      )}
    </div>
  );
};
