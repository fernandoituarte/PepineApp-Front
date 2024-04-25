import Link from "next/link"; // Importing the Link component from Next.js for SPA-like navigation.
import { FaFacebookSquare } from "react-icons/fa"; // Importing the Facebook icon from react-icons.

// Navigation object containing arrays of links to be displayed in the footer.
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
      icon: <FaFacebookSquare size={30} className="mr-2" />, // Icon with a right margin for visual separation.
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1c4b30] w-full absolute z-20">
      {" "}
      {/* // Footer styling with custom background color and positioning. */}
      <div className="mx-auto max-w-7xl overflow-hidden px-6 pt-6 pb-10 sm:py-10 lg:px-8">
        {" "}
        {/* // Container with responsive padding and maximum width. */}
        <h3 className="text-center text-white font-bold text-lg mb-8">
          {" "}
          Poussez pas derrière - Pépinièriste à Saint André
        </h3>
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center items-center sm:space-x-12" // Responsive layout for navigation links.
          aria-label="Footer" // Accessibility label for better SEO and screen-reader support.
        >
          {navigation.main.map(
            (
              item, // Mapping over navigation items to create links dynamically.
            ) => (
              <div key={item.name} className="pb-3 font-normal">
                {" "}
                {/* // Unique key based on item name and normal font styling. */}
                <Link
                  href={item.href}
                  className="text-sm flex items-center leading-6 h-auto text-white hover:text-gray-400" // Link styling with hover effect.
                >
                  {item.icon && item.icon}
                  {/* // Conditionally rendering the icon */}
                  {item.name}
                  {/* // Rendering the name of the link. */}
                </Link>
              </div>
            )
          )}
        </nav>
      </div>
    </footer>
  );
}
