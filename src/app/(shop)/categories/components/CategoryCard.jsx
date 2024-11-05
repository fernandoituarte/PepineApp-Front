import Image from "next/image";
import Link from "next/link";

/**
 * `CategoryCard` is a component that represents a card to display a category.
 *
 * - It shows an image, the category name (`value`), and its description.
 * - Each card is a link that redirects to the products page within the category.
 *
 * @param {object} category - The category data, including `value`, `description`, `id`, and `media`.
 */

export function CategoryCard(category) {
  const { value, description, id, media } = category;

  return (
    <div
      className="border b-5 rounded-lg shadow-md p-5 m-2 lg:h-[550px]"
      aria-hidden="false"
    >
      <Link href={`categories/${id}`}>
        <div className="flex flex-col h-full cursor-pointer">
          <div className="flex justify-center mt-4">
            <Image
              className="rounded-full shadow-2xl object-cover"
              src={media.url}
              alt="Category's image"
              width={300}
              height={300}
              style={{ aspectRatio: 1 / 1 }}
              priority
            />
          </div>

          <div className="mt-6 flex-grow">
            <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
              {value}
            </h3>
            <p className="text-sm text-pretty leading-6 text-gray-600 overflow-hidden overflow-ellipsis line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
