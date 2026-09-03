import React from "react";
import {
  FiSearch,
  FiPlus,
  FiBell,
  FiMoon,
  FiUser,
} from "react-icons/fi";

export default function InvoiceHeader() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-[#111111] px-6 py-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 rounded-2xl bg-[#A8B9FF] px-6 py-3 font-semibold text-[#111111] transition hover:opacity-90">
          <FiPlus className="text-xl" />
          <span>فاتورة جديدة</span>
        </button>

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400" />

          <input
            type="text"
            placeholder="البحث عن رقم الفاتورة أو اسم العميل..."
            className="w-[340px] rounded-2xl border border-zinc-700 bg-[#1B1B1B] py-3 pr-12 pl-4 text-white outline-none placeholder:text-zinc-500 focus:border-[#A8B9FF]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="text-zinc-300 transition hover:text-white">
          <FiUser size={22} />
        </button>

        <button className="text-zinc-300 transition hover:text-white">
          <FiMoon size={22} />
        </button>

        <button className="relative text-zinc-300 transition hover:text-white">
          <FiBell size={22} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-blue-500"></span>
        </button>
      </div>
    </header>
  );
}