"use client";
import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

import { ItemImage } from "..";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { RiDeleteBin5Line } from "react-icons/ri";

/**
 * The `ImagesUploader` component allows users to upload images and preview them.
 *
 * Props:
 * - `media`: An array of currently uploaded media items.
 * - `setMedia`: A function to update the media state.
 * - `setMediaToUpdate`: A function to update the media that needs to be updated.
 * - `mediaToUpdate`: An array of media items that are scheduled for update.
 *
 * Features:
 * - Users can select multiple image files, which are then previewed in the UI.
 * - Each uploaded image has a delete button to remove it from the preview and the state.
 * - The component provides a file input for selecting images, with a clear indication of accepted file formats.
 * - The layout adapts to screen sizes using responsive grid classes.
 */

export function ImagesUploader({
  media,
  setMedia,
  setMediaToUpdate,
  mediaToUpdate,
}) {
  const [selectedImages, setSelectedImages] = useState([]);

  // Upload images
  const handleFileChange = (event) => {
    const mediaToUpdateArray = Array.from(event.target.files);
    const imageURLs = [];

    mediaToUpdateArray.forEach((image) => {
      const imageUrl = URL.createObjectURL(image);
      imageURLs.push(imageUrl);
    });

    setMediaToUpdate((prevFiles) => [...prevFiles, ...mediaToUpdateArray]);
    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...imageURLs,
    ]);
  };

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedFiles = mediaToUpdate.filter((_, i) => i !== index);
    const updatedURLs = selectedImages.filter((_, i) => i !== index);

    setMediaToUpdate(updatedFiles);
    setSelectedImages(updatedURLs);
  };

  return (
    <div className="col-span-3 pb-10 pt-5 px-5 lg:col-start-2 lg:col-span-4">
      {Array.isArray(media) && media?.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-4">
          {media.map((item) => (
            <ItemImage
              key={item}
              item={item}
              media={media}
              setMedia={setMedia}
            />
          ))}
        </div>
      )}

      <div
        className={clsx("grid grid-cols-2 md:grid-cols-3 gap-6 py-4", {
          "border-t border-gray-900/10 mt-5": selectedImages.length > 0,
        })}
      >
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <div key={index} className="relative max-w-60 max-h-52">
              <RiDeleteBin5Line
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-[#ffffff91] text-red p-1 rounded-sm z-10 cursor-pointer m-2 h-8 w-8"
              />
              <Image
                src={`${image}`}
                alt={`uploaded-${index}`}
                width={700}
                height={700}
                className="object-cover object-center rounded-lg h-52"
              />
            </div>
          ))}
      </div>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 py-10">
        <div className="text-center">
          <PhotoIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative mx-auto cursor-pointer rounded-md bg-white font-semibold text-[#af5f02] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#af5e0291] focus-within:ring-offset-2 hover:text-[#af5e0291]"
            >
              <span>Téléchargez un fichier</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs text-center leading-5 text-gray-600">
            Formats de fichier: PNG, JPG, JPEG, GIF.
          </p>
        </div>
      </div>
    </div>
  );
}
