"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export const Pagination = ({ totalPages, limit, baseUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    router.replace(
      `${baseUrl}?limit=${limit}&offset=${(currentPage - 1) * limit}`,
    );
  }, [currentPage, limit, router, baseUrl]);

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center justify-center -space-x-px h-10 text-base my-10">
        <li>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            className={clsx(
              "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700",
              {
                "opacity-50 pointer-events-none": currentPage === 1,
              },
            )}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageClick(page)}
              aria-current="page"
              className={clsx(
                "flex items-center justify-center px-4 h-10 leading-tight",
                {
                  "z-10 text-green-600 border border-green-300 bg-green-50 hover:bg-green-100 hover:text-green-700":
                    currentPage === page,
                },
                {
                  "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700":
                    currentPage !== page,
                },
              )}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            className={clsx(
              "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700",
              {
                "opacity-50 pointer-events-none": currentPage === totalPages,
              },
            )}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
