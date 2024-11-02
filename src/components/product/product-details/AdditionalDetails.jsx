"use client";

import {
  Disclosure,
  DisclosurePanel,
  DisclosureButton,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

/**
 * Component to display additional details of a product in collapsible panels.
 * Each panel can be expanded or collapsed to show or hide the details.
 */
export const AdditionalDetails = ({ product }) => {
  // Predefined sections for display in the disclosure component.
  const productDetails = [
    {
      name: "Informations Générales",
      items: [
        `Nom Scientifique: ${product?.scientific_name}`,
        `Famille: ${product?.family}`,
        `Origine: ${product?.origin}`,
        `Taille: ${product?.size}`,
        `Pot: ${product?.pot}`,
        `Stock: ${product?.stock}`,
        `Prix: ${product?.price}`,
        `Statut: ${product?.status ? "Disponible" : "Indisponible"}`,
      ],
    },
    {
      name: "Détails Botaniques",
      items: [
        `Couleur des Fleurs: ${product?.flower_color}`.padEnd(30),
        `Couleur des Feuilles: ${product?.leaf_color}`,
        `Rendement: ${product?.yield}`,
        `Exposition: ${product?.exposure}`,
        `Type de feuillage: ${product?.foliage}`,
        `Pouvoir couvrant: ${product?.ground_cover_power}`,
        `Zone de rusticité: ${product?.hardiness_zone}`,
        `Hauteur Adulte: ${product?.maturity_height}`,
        `Largeur adulte: ${product?.maturity_width}`,
        `Besoin en eau: ${product?.water_requirement}`,
        `Strate: ${product?.strate}`,
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
              <p>
                <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                  <span
                    className={clsx("text-lg font-medium", {
                      "text-green-800": open,
                      "text-gray-900": !open,
                    })}
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
                </DisclosureButton>
              </p>
              <DisclosurePanel as="div" className="prose prose-sm pb-6">
                <ul role="list">
                  {/* Maps over each item in the current section and creates a list item for it. */}
                  {detail.items.map((item, index) => {
                    const firstColonIndex = item.indexOf(":");
                    const key = item.substring(0, firstColonIndex + 1);
                    const value = item.substring(firstColonIndex + 1).trim();
                    const isPrice = key.toLowerCase().includes("prix");

                    return (
                      <li key={index} className="flex justify-between">
                        <span>{key}</span>
                        <span className="font-semibold">
                          {isPrice ? `${value} €` : value}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};
