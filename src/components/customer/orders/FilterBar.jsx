import {
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";


const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6">

      {/* Right Side */}
      <div className="text-white ">
        <h2 className="text-4xl mb-1">طلباتي</h2>
        <p className="text-[#979494]" >تتبع وإدارة مشترياتك من قطع الغيار والأكسسوارات.</p>
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#A5B4FC] hover:bg-[#1E1E1E]">
          <FunnelIcon className="h-4 w-4" />
          تصفية
        </button>

        <button className="flex items-center gap-2 rounded-full border border-zinc-700 bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#A5B4FC] hover:bg-[#1E1E1E]">
          <AdjustmentsHorizontalIcon className="h-4 w-4" />
          ترتيب حسب
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
