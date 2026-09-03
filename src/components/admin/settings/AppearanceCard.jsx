import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";

export default function AppearanceCard() {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <IoColorPaletteOutline className="text-3xl text-indigo-300" />

        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">
            واجهة النظام
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            اختر المظهر الذي يناسب بيئة عملك
          </p>
        </div>
      </div>

      {/* Theme Options */}
      <div className="space-y-4">
        <ThemeToggle
          active
          title="الوضع الليلي"
          icon="moon"
        />

        <ThemeToggle
          title="الوضع النهاري"
          icon="sun"
        />
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-zinc-800" />

      {/* Auto Update */}
      <div className="flex items-center justify-between">
        <span className="text-lg text-white">
          تحديث تلقائي
        </span>

        <button className="relative w-12 h-7 rounded-full bg-indigo-300 transition">
          <span className="absolute left-1 top-1 w-5 h-5 rounded-full bg-indigo-900 transition"></span>
        </button>
      </div>
    </div>
  );
}