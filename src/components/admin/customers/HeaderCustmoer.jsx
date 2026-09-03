import React from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiMoon,
  FiPlus,
} from "react-icons/fi";

export default function HeaderCustomer() {
  return (
    <header className="flex items-center justify-between py-6">
      {/* Left */}
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-2 rounded-xl bg-indigo-300 hover:bg-indigo-400 text-slate-900 font-semibold px-6 py-3 transition">
          <FiPlus size={20} />
          <span>إضافة عميل جديد</span>
        </button>

        <div className="h-8 w-px bg-zinc-700"></div>

        <button className="text-zinc-300 hover:text-white transition">
          <FiUser size={22} />
        </button>

        <button className="text-zinc-300 hover:text-white transition">
          <FiMoon size={22} />
        </button>

        <button className="text-zinc-300 hover:text-white transition relative">
          <FiBell size={22} />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
        </button>
      </div>

      {/* Search */}
      <div className="relative w-[420px]">
        <input
          type="text"
          placeholder="ابحث عن عميل أو فاتورة..."
          className="w-full bg-[#1B1B1F] border border-zinc-700 rounded-full py-3 pr-12 pl-5 text-white placeholder:text-zinc-500 outline-none focus:border-indigo-400 transition"
        />

        <FiSearch
          size={20}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>
    </header>
  );
}