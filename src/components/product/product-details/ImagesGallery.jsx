"use client";
import Image from "next/image";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import clsx from "clsx";
import noimage from "../../../../public/noimagen.webp";

export const ImagesGallery = ({ urls }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      {/* Thumbnail selector for images */}
      <div className="mx-4 sm:mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-4">
          {urls &&
            urls.length > 0 &&
            urls.map((image, index) => (
              <Tab
                key={index}
                className="relative flex h-20 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-2"
              >
                {({ selected }) => (
                  <>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <Image
                        width={150}
                        height={150}
                        src={image === null ? noimage : image.url}
                        alt="Product Thumbnail"
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 15vw, 10vw"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span
                      className={clsx(
                        "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                        {
                          "ring-indigo-500": selected,
                          "ring-transparent": !selected,
                        },
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </Tab>
            ))}
        </TabList>
      </div>
      {/* Main display for the selected image */}
      <TabPanels className="w-full">
        {urls &&
          urls.length > 0 &&
          urls.map((image, index) => (
            <TabPanel key={index}>
              <Image
                width={1200}
                height={800}
                priority
                src={image === null ? noimage : image.url}
                alt="Product Image"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-[430px] w-full lg:h-[500px] object-cover object-center sm:rounded-lg"
              />
            </TabPanel>
          ))}
      </TabPanels>
    </TabGroup>
  );
};
