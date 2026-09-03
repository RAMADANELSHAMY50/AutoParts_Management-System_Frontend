import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}) {
  const handlePageChange = (page) => {
    if (page < 1 || page > pageCount) return;

    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between mt-8 border border-gray-700 rounded-xl p-4">
      <p className="text-gray-400">
        
        <span className="text-sm text-zinc-400">
          إظهار {currentPage} من أصل {pageCount}
        </span>
      </p>

      <div className="flex gap-2">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-10 h-10 rounded-lg bg-[#222] disabled:opacity-40 hover:bg-blue-600 text-white"
        >
          <FiChevronRight className="mx-auto" />
        </button>

        {/* Next */}
        <button
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-10 h-10 rounded-lg bg-[#222] disabled:opacity-40 hover:bg-blue-600 text-white"
        >
          <FiChevronLeft className="mx-auto" />
        </button>
      </div>
    </div>
  );
}