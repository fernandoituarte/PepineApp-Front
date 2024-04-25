"use client";
import Image from "next/image";
import { Tab } from "@headlessui/react";

// Utility function to filter out false values and join class names into a single string.
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Renders an image gallery using tabs to switch between different images.
 * Allows clicking on thumbnail images to view a larger version of the image.
 *
 * @param {Array} urls - Array of image URLs to display in the gallery.
 */
export const ImagesGallery = ({ urls }) => {
  return (
    <>
      <Tab.Group as="div" className="flex flex-col-reverse">
        {/* Thumbnail selector for images */}
        <div className="mx-4 sm:mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
          <Tab.List className="grid grid-cols-4 gap-6">
            {urls &&
              urls.length > 0 &&
              urls.map((image, index) => (
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
                          src={image === null ? "/noimagen.webp" : image}
                          alt="Product Image"
                          className="h-full w-full object-cover object-center"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
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
        {/* Main display for the selected image */}
        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
          {urls &&
            urls.length > 0 &&
            urls.map((image, index) => (
              <Tab.Panel key={index}>
                <Image
                  width={800}
                  height={800}
                  src={image === null ? "/noimagen.webp" : image}
                  alt="Product Image"
                  className="h-[430px] w-full lg:h-[500px] object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};
