import { Title } from "@/components";
import Link from "next/link";
import { LuShoppingBasket } from "react-icons/lu";

export const metadata = {
  title: "Votre panier",
  description: "Le panier est vide",
};
export default function Page() {
  return (
    <div>
      <Title title={"Votre panier est vide"} className={"text-center"} />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="bg-indigo-50 rounded-full w-[300px] h-[300px] mx-auto flex items-center justify-center">
          <LuShoppingBasket size={150} className="text-indigo-400" />
        </div>
        <div className="flex flex-col">
          <p className="text-xl text-center mt-10 mb-5 text-gray-600">
            ¡Il semble que votre panier soit vide !
          </p>
          <Link
            href={"/products"}
            className="bg-amber-500 text-white py-3 px-5 rounded-lg mx-auto"
          >
            Ajouter des articles
          </Link>
        </div>
      </div>
    </div>
  );
}
