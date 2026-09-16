import React from "react";
import { IoColorPaletteOutline } from "react-icons/io5";
import ThemeToggle from "./ThemeToggle";

export default function AppearanceCard() {
  return (
    <div
      dir="rtl"
      className="
        h-full
        rounded-xl
        border
        border-zinc-800
        bg-[#171717]
        p-4
        sm:rounded-2xl
        sm:p-6
      "
    >
      {/* Header */}
      <div
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-3
          sm:mb-8
          sm:items-center
        "
      >
        <IoColorPaletteOutline
          className="
            shrink-0
            text-2xl
            text-indigo-300
            sm:text-3xl
          "
        />

        <div className="min-w-0 text-right">
          <h2
            className="
              break-words
              text-lg
              font-semibold
              text-white
              sm:text-xl
            "
          >
            واجهة النظام
          </h2>

          <p
            className="
              mt-1
              break-words
              text-xs
              leading-5
              text-zinc-400
              sm:mt-2
              sm:text-sm
            "
          >
            اختر المظهر الذي يناسب بيئة عملك
          </p>
        </div>
      </div>

      {/* Theme Options */}
      <div className="space-y-3 sm:space-y-4">
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
      <div className="my-6 border-t border-zinc-800 sm:my-8" />

      {/* Auto Update */}
      <div className="flex items-center justify-between gap-4">
        <span
          className="
            text-sm
            text-white
            sm:text-lg
          "
        >
          تحديث تلقائي
        </span>

        <button
          type="button"
          className="
            relative
            h-7
            w-12
            shrink-0
            rounded-full
            bg-indigo-300
            transition
          "
          aria-label="تفعيل التحديث التلقائي"
        >
          <span
            className="
              absolute
              left-1
              top-1
              h-5
              w-5
              rounded-full
              bg-indigo-900
              transition
            "
          />
        </button>
      </div>
    </div>
  );
}