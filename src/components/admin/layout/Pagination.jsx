import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

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
    <div
      className="
        mt-5
        sm:mt-6
        lg:mt-8
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-center
        sm:justify-between
        border
        border-gray-700
        rounded-xl
        sm:rounded-2xl
        p-2.5
        sm:p-3
        lg:p-4
        w-full
        min-w-0
      "
    >
      {/* Page Info */}
      <p className="min-w-0">
        <span
          className="
            block
            text-xs
            sm:text-sm
            text-zinc-400
            truncate
          "
        >
          إظهار {currentPage} من أصل {pageCount}
        </span>
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Previous */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="
            flex
            h-8
            w-8
            sm:h-9
            sm:w-9
            lg:h-10
            lg:w-10
            items-center
            justify-center
            rounded-lg
            bg-[#222]
            text-white
            transition
            hover:bg-blue-600
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="الصفحة السابقة"
        >
          <FiChevronRight className="text-sm sm:text-base" />
        </button>

        {/* Current Page */}
        <div
          className="
            flex
            h-8
            min-w-8
            sm:h-9
            sm:min-w-9
            lg:h-10
            lg:min-w-10
            items-center
            justify-center
            rounded-lg
            border
            border-blue-500/40
            bg-blue-500/10
            px-2
            text-xs
            sm:text-sm
            font-semibold
            text-blue-400
          "
        >
          {currentPage}
        </div>

        {/* Next */}
        <button
          type="button"
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
          className="
            flex
            h-8
            w-8
            sm:h-9
            sm:w-9
            lg:h-10
            lg:w-10
            items-center
            justify-center
            rounded-lg
            bg-[#222]
            text-white
            transition
            hover:bg-blue-600
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="الصفحة التالية"
        >
          <FiChevronLeft className="text-sm sm:text-base" />
        </button>
      </div>
    </div>
  );
}