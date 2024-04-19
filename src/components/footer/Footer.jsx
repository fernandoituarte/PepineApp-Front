import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";

const navigation = {
  main: [
    { name: "Conditions Générales d'utilisation", href: "/cgu" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
    { name: "Mentions Legales", href: "/legal" },
    { name: "Credits", href: "/credits" },
    {
      name: "Suivez nous sur Facebook",
      href: "https://www.facebook.com/PoussezPasDerriere/",
      icon: <FaFacebookSquare size={30} className="mr-2" />,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1c4b30] w-full absolute z-20">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pt-6 pb-10 sm:py-10 lg:px-8">
        <h3 className="text-center text-white font-bold text-lg mb-8">
          Poussez pas derrière - Pépinièriste à Saint André
        </h3>
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center items-center sm:space-x-12"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-3 font-normal">
              <Link
                href={item.href}
                className="text-sm flex items-center leading-6 h-auto text-white hover:text-gray-400"
              >
                {item.icon && item.icon}
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
