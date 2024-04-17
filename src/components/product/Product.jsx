"use client";
import Image from "next/image";
import axios from "axios";

import { AddToCart } from "@/components";

import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Icon } from "@iconify/react";

const URL = process.env.NEXT_PUBLIC_URL;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Product({ product }) {
  const item = {
    id: product.id,
    name: product.name,
    media: product.media_urls[0],
    price: product.price,
    stock: product.stock,
    status: product.status,
  };

  const productDetails = [
    {
      name: "Informations Générales",
      items: [
        `Nom Scientifique: ${product.scientific_name}`,
        `Famille: ${product.family}`,
        `Origine: ${product.origin}`,
        `Taille: ${product.size}`,
        `Pot: ${product.pot}`,
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
    <div className="bg-white">
      <main className="mx-auto mb-28 max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mb-6">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-4 md:mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6 ">
                  {product.media_urls[0] &&
                    product.media_urls.map((image, index) => (
                      <Tab
                        key={index}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <Image
                                width={800}
                                height={800}
                                src={image}
                                alt="alt"
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>
              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.media_urls[0] &&
                  product.media_urls.map((image, index) => (
                    <Tab.Panel key={index}>
                      <Image
                        width={800}
                        height={800}
                        src={image}
                        alt="alt"
                        className="h-[430px] w-full lg:h-[500px] object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {`Prix: ${product.price}€`}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: product.description1 }}
                />
              </div>

              <form className="mt-6">
                <div className="flex flex-wrap gap-2">
                  <div className="mx-4 flex-col items-center ">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="carbon:crop-growth"
                        className="mx-auto w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">{product.size}</p>
                  </div>
                  <div className="mx-4 flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="fluent-emoji-flat:potted-plant"
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">{product.pot}</p>
                  </div>
                  <div className="flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="line-md:sunny-filled-loop"
                        color="#ffe564"
                        className="mx-auto w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">
                      {product.exposure_value}
                    </p>
                  </div>
                  <div className="mx-4 flex flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="ph:flower-duotone"
                        color="#dd7cea"
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">
                      {product.flower_color}
                    </p>
                  </div>
                  <div className="mx-4 flex flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="twemoji:fallen-leaf"
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">
                      {product.foliage_value}
                    </p>
                  </div>
                  <div className="mx-4 flex flex-col items-center">
                    <h3 className="text-lg text-gray-600 mb-2">
                      <Icon
                        icon="noto:sweat-droplets"
                        className="w-6 h-6 md:w-12 md:h-12"
                      />
                    </h3>
                    <p className="font-bold text-center">
                      {product.water_requirement_value}
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex">
                  <AddToCart item={item} />
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
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
                              <span className="ml-6 flex items-center">
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
                          <Disclosure.Panel
                            as="div"
                            className="prose prose-sm pb-6"
                          >
                            <ul className="" role="list">
                              {detail.items.map((item, index) => {
                                // Séparer la clé et la valeur
                                const [key, value] = item.split(":");
                                const formattedKey = `${key}: `;
                                const isPrice = key
                                  .toLowerCase()
                                  .includes("price");

                                return (
                                  <li key={index}>
                                    <span>{formattedKey}</span>
                                    <span className="font-bold">
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
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
