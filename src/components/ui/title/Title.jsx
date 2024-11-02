"use client";
import { titleFont } from "@/config/fonts";

export const Title = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`mx-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7`}
      >
        {title}
      </h1>
      {subtitle && <h2 className={`text-xl mb-5 antialiased`}>{subtitle}</h2>}
    </div>
  );
};
