import {
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

const FilterBar = ({
  activeFilter = "all",
  setActiveFilter,
  sortBy = "newest",
  setSortBy,
}) => {
  return (
    <div className="mb-5 sm:mb-6 lg:mb-8">
      {/* Title */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          طلباتي
        </h1>

        <p className="mt-1.5 text-xs text-[#979494] sm:mt-2 sm:text-sm lg:text-base">
          تابع جميع طلباتك وتفاصيلها
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Status Filter */}
        <div className="relative w-full sm:w-auto">
          <FunnelIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 sm:h-5 sm:w-5" />

          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter?.(e.target.value)}
            className="w-full appearance-none rounded-xl border border-zinc-800 bg-[#171717] py-2.5 pl-9 pr-10 text-xs text-white outline-none transition focus:border-[#A5B4FC] sm:w-48 sm:text-sm lg:w-52"
          >
            <option value="all">كل الطلبات</option>
            <option value="processing">قيد التنفيذ</option>
            <option value="shipping">جاري الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>

        {/* Sort */}
        <div className="relative w-full sm:w-auto">
          <ArrowsUpDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 sm:h-5 sm:w-5" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy?.(e.target.value)}
            className="w-full appearance-none rounded-xl border border-zinc-800 bg-[#171717] py-2.5 pl-9 pr-10 text-xs text-white outline-none transition focus:border-[#A5B4FC] sm:w-48 sm:text-sm lg:w-52"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="oldest">الأقدم أولاً</option>
            <option value="highest">الأعلى سعراً</option>
            <option value="lowest">الأقل سعراً</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;