import Image from "next/image";
import errorImage from "../../../../public/errorImage.png";

export const ErrorComponent = ({ text }) => {
  return (
    <div className="flex justify-center py-24 px-4">
      <div className="mx-auto">
        <Image src={errorImage} width={600} height={600} alt="Error image" />
        <div className="text-2xl font-bold text-red-400 text-center mt-4">
          {text}
        </div>
      </div>
    </div>
  );
};
