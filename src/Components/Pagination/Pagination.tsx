import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const MAX_VISIBLE_PAGES = 5;

  const getPageNumbers = () => {
    const pages: number[] = [];

    const showLeftEllipsis = currentPage > 3;
    const showRightEllipsis = currentPage < totalPages - 2;

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (!showLeftEllipsis) {
      startPage = 2;
      endPage = Math.min(totalPages - 1, MAX_VISIBLE_PAGES);
    }

    if (!showRightEllipsis) {
      startPage = Math.max(2, totalPages - MAX_VISIBLE_PAGES + 1);
      endPage = totalPages - 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return { pages, showLeftEllipsis, showRightEllipsis };
  };

  const goToPrevious = () => onPageChange(Math.max(currentPage - 1, 1));
  const goToNext = () => onPageChange(Math.min(currentPage + 1, totalPages));

  const { pages, showLeftEllipsis, showRightEllipsis } = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center items-center flex-wrap gap-2" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        aria-label="Previous page"
      >
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </button>

      {/* First Page */}
      <button
        onClick={() => onPageChange(1)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
          currentPage === 1
            ? "bg-purple-600 text-white shadow-md"
            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300"
        }`}
        aria-label="Page 1"
        aria-current={currentPage === 1 ? "page" : undefined}
      >
        1
      </button>

      {/* Left Ellipsis */}
      {showLeftEllipsis && (
        <span className="px-2 text-gray-400 text-sm select-none">...</span>
      )}

      {/* Dynamic Pages */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
            currentPage === page
              ? "bg-purple-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300"
          }`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Right Ellipsis */}
      {showRightEllipsis && (
        <span className="px-2 text-gray-400 text-sm select-none">...</span>
      )}

      {/* Last Page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
            currentPage === totalPages
              ? "bg-purple-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300"
          }`}
          aria-label={`Page ${totalPages}`}
          aria-current={currentPage === totalPages ? "page" : undefined}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        onClick={goToNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        aria-label="Next page"
      >
        <span className="flex items-center gap-1">
          Next
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </nav>
  );
};

export default Pagination;