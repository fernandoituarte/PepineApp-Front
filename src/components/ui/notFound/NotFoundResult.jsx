import Image from "next/image";
import imgNoItemFound from "../../../../public/imgNoItemFound.jpg";
export const NotFoundResult = ({ text }) => {
  return (
    <div className="flex justify-center py-24 px-4">
      <div className="mx-auto">
        <Image
          src={imgNoItemFound}
          width={600}
          height={600}
          alt="No item found"
        />
        <div className="text-2xl font-bold text-indigo-400 text-center mt-4">
          {text}
        </div>
      </div>
    </div>
  );
};
