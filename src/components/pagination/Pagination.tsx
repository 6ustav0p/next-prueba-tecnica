'use client';
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center gap-x-2 mt-6" aria-label="Pagination">
      <button
        type="button"
        className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : "hover:bg-gray-100 dark:hover:bg-white/10"
        } text-gray-800 dark:text-white`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"></path>
        </svg>
      </button>

      <div className="flex items-center gap-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-white/10"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg ${
          currentPage === totalPages ? "opacity-50 pointer-events-none" : "hover:bg-gray-100 dark:hover:bg-white/10"
        } text-gray-800 dark:text-white`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
      </button>
    </nav>
  );
};
