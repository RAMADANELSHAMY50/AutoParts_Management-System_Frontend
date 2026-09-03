import React from "react";
import {
  FiSearch,
  FiFilter,
} from "react-icons/fi";

export default function SearchToolbar({customer}) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-5">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-white">
          قائمة العملاء
        </h2>

        <span className="rounded-full bg-indigo-500/20 border border-indigo-400/30 px-4 py-1 text-sm text-indigo-300">
          {customer} عميل تم العثور عليهم
        </span>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="ابحث بالاسم أو الهاتف..."
            className="w-80 rounded-xl border border-zinc-700 bg-[#1B1B1F] py-3 pr-12 pl-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-indigo-400"
          />

          <FiSearch
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
        </div>

        {/* Filter */}
        <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 bg-[#1B1B1F] text-zinc-300 transition hover:border-indigo-400 hover:text-white">
          <FiFilter size={20} />
        </button>
      </div>
    </div>
  );
}