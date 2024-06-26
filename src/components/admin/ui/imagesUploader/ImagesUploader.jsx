"use client";
import { useEffect } from "react";

import { ItemImage } from "@/components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  createMediaOrder,
  deleteImage,
  uploadImage,
} from "@/store/reducer/products/media/media";

import { SkeletonImage } from "@/components";

import { PhotoIcon } from "@heroicons/react/24/solid";

export function ImagesUploader({ id }) {
  const dispatch = useAppDispatch();
  const { productId } = useAppSelector((state) => state.product);
  const { isCategorySended } = useAppSelector(
    (state) => state.productCategories,
  );
  const { media, mediaToDelete, loading } = useAppSelector(
    (state) => state.media,
  );

  // Every time an image is selected, a dispatch of image is made
  const handleFileChange = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("images", imageFile);

    dispatch(uploadImage(formData));
  };

  // Once the product has been submitted, a media order is created and the items are removed from localStorage
  useEffect(() => {
    if (isCategorySended && media.length > 0) {
      const newOrder = media.map((item, index) => ({
        product_id: productId ? productId : id,
        media_id: item.id,
        order: index + 1,
      }));
      dispatch(createMediaOrder(newOrder));
      if (mediaToDelete.length > 0) {
        mediaToDelete.map((id) => {
          dispatch(deleteImage(id));
        });
      }
    }
  }, [isCategorySended, media, dispatch, productId, mediaToDelete, id]);

  return (
    <div
      onChange={handleFileChange}
      className="col-span-3 py-10 px-5 lg:col-start-2 lg:col-span-4"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 py-4">
        {media.length > 0 &&
          media[0].id !== null &&
          media.map((item) => <ItemImage key={item.url} {...item} />)}
        {loading && <SkeletonImage className={"rounded-lg h-52"} />}
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
              className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2 hover:text-amber-500"
            >
              <span>Téléchargez un fichier</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                multiple
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            Formats de fichier: PNG, JPG.
          </p>
        </div>
      </div>
    </div>
  );
}
