import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const CatalogPagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  // لا تظهر إذا كان عندنا صفحة واحدة
  if (totalPages <= 1) {
    return null;
  }

  // ==========================================
  // Generate Pages
  // ==========================================
  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // ==========================================
  // Change Page
  // ==========================================
  const handlePageChange = (page) => {
    if (page < 1) {
      return;
    }

    if (page > totalPages) {
      return;
    }

    if (page === currentPage) {
      return;
    }

    onPageChange(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      dir="rtl"
      className="mt-10 flex items-center justify-center gap-2"
    >
      {/* ======================================
          Previous
      ====================================== */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          handlePageChange(
            currentPage - 1
          )
        }
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === 1
            ? "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
            : "border-zinc-700 bg-[#181818] text-zinc-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        }`}
        aria-label="الصفحة السابقة"
      >
        <FiChevronRight size={20} />
      </button>

      {/* ======================================
          Page Numbers
      ====================================== */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              handlePageChange(page)
            }
            aria-current={
              currentPage === page
                ? "page"
                : undefined
            }
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${
              currentPage === page
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-zinc-800 bg-[#181818] text-zinc-400 hover:border-blue-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* ======================================
          Next
      ====================================== */}
      <button
        type="button"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          handlePageChange(
            currentPage + 1
          )
        }
        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
          currentPage === totalPages
            ? "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
            : "border-zinc-700 bg-[#181818] text-zinc-300 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
        }`}
        aria-label="الصفحة التالية"
      >
        <FiChevronLeft size={20} />
      </button>
    </div>
  );
};

export default CatalogPagination;