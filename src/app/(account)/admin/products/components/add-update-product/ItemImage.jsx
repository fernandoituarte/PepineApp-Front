"use client";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteImage } from "@/store/reducer/media/media";

import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";

/**
 * The `ItemImage` component displays a single image with a delete option.
 *
 * Props:
 * - `item`: The URL of the image to display.
 * - `media`: The current list of media items.
 * - `setMedia`: A function to update the media state.
 *
 * Features:
 * - Displays an image using the Next.js Image component for optimized loading.
 * - Includes a delete icon that allows users to remove the image from the media list.
 * - Upon clicking the delete icon, the image is marked for deletion, and the delete action is dispatched to the Redux store.
 * - Listens for changes in the deletion status. If successful, updates the media state to reflect the removed image.
 *
 * State Management:
 * - `deleting`: Tracks the deletion process to manage UI updates.
 */

export function ItemImage({ item, media, setMedia }) {
  const dispatch = useAppDispatch();
  const { status, loading, error } = useAppSelector((state) => state.media);
  const [deleting, setDeleting] = useState(false);

  // Delete image
  function handleDeleteImage(url) {
    const id = url.split("/")[5];
    setDeleting(true);
    dispatch(deleteImage(id));
  }

  // Updates the array of images after deleting an image
  useEffect(() => {
    if (status === 201 && deleting) {
      const newMediaList = media.filter((image) => image !== item);
      setMedia(newMediaList);
      setDeleting(false);
    }
  }, [status, deleting, item, setMedia, media]);

  return (
    <div className="relative max-w-60 max-h-52">
      <RiDeleteBin5Line
        onClick={() => handleDeleteImage(item)}
        className="absolute top-0 right-0 bg-[#e00d0d] text-white p-1 rounded-sm z-10 cursor-pointer m-2 h-8 w-8"
      />
      <Image
        src={`${item}`}
        alt={item}
        width={700}
        height={700}
        className="object-cover object-center rounded-lg h-52"
      />
    </div>
  );
}
