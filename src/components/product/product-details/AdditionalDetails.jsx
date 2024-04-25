// Directive to ensure this component only runs on the client side in a Next.js environment.
"use client";

import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

// Helper function to join class names based on their truthiness.
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Component to display additional details of a product in collapsible panels.
 * Each panel can be expanded or collapsed to show or hide the details.
 *
 * @param {object} product - The product object containing various attributes to be displayed.
 */
export const AdditionalDetails = ({ product }) => {
  // Predefined sections for display in the disclosure component.
  const productDetails = [
    {
      name: "Informations Générales",
      items: [
        `Nom Scientifique: ${product.scientific_name}`,
        `Famille: ${product.family}`,
        `Origine: ${product.origin}`,
        `Taille: ${product.size}`,
        `Pot: ${product.pot}`,
        `Stock: ${product.stock}`,
        `Prix: ${product.price}`,
        `Statut: ${product.status ? "Disponible" : "Indisponible"}`,
      ],
    },
    {
      name: "Détails Botaniques",
      items: [
        `Couleur des Fleurs: ${product.flower_color}`,
        `Couleur des Feuilles: ${product.leaf_color}`,
        `Rendement: ${product.yield_value}`,
        `Exposition: ${product.exposure_value}`,
        `Type de feuillage: ${product.foliage_value}`,
        `Pouvoir couvrant: ${product.ground_cover_power_value}`,
        `Zone de rusticité: ${product.hardiness_zone_value}`,
        `Hauteur Adulte: ${product.maturity_height}`,
        `Largeur adulte: ${product.maturity_width}`,
        `Besoin en eau: ${product.water_requirement_value}`,
        `Strate: ${product.strate_value}`,
      ],
    },
  ];

  return (
    <div className="divide-y divide-gray-200 border-t">
      {/* Iterates through each detail section and creates a collapsible disclosure panel for it. */}
      {productDetails.map((detail, index) => (
        <Disclosure as="div" key={index}>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span
                    className={classNames(
                      open ? "text-indigo-600" : "text-gray-900",
                      "text-lg font-medium",
                    )}
                  >
                    {detail.name}
                  </span>
                  <span className="flex items-center">
                    {open ? (
                      <MinusIcon
                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <PlusIcon
                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                <ul role="list">
                  {/* Maps over each item in the current section and creates a list item for it. */}
                  {detail.items.map((item, idx) => {
                    const firstColonIndex = item.indexOf(":");
                    const key = item.substring(0, firstColonIndex + 1);
                    const value = item.substring(firstColonIndex + 1).trim();
                    const isPrice = key.toLowerCase().includes("prix");

                    return (
                      <li key={idx}>
                        <span>{key}</span>
                        <span className="font-semibold">
                          {isPrice ? `${value} €` : value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};
