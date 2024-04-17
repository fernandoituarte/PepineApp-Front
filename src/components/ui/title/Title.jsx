import { titleFont } from "@/config/fonts";

export const Title = ({ title, subtitle, className }) => {
  return (
    <div className={`mx-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7 ${className}`}
      >
        {title}
      </h1>
      {subtitle && (
        <h3 className={`text-xl mb-5 antialiased ${className}`}>{subtitle}</h3>
      )}
    </div>
  );
};
