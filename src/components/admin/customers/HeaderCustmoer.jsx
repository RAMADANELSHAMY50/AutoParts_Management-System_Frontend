import React from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiMoon,
  FiMenu,
} from "react-icons/fi";

export default function HeaderCustomer({
  onMenuClick,
}) {
  return (
    <header
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-3
        py-1
        sm:gap-4
        sm:py-2
        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:py-6
      "
    >
      {/* Top Row Mobile */}
      <div
        className="
          flex
          w-full
          items-center
          justify-between
          gap-2
          lg:hidden
        "
      >
        {/* Menu */}
        <button
          type="button"
          onClick={() => onMenuClick?.()}
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-zinc-700
            bg-[#1B1B1F]
            text-zinc-200
            transition
            hover:border-indigo-400
            hover:text-white
            active:scale-95
            sm:h-10
            sm:w-10
          "
          aria-label="فتح القائمة"
          title="فتح القائمة"
        >
          <FiMenu size={20} />
        </button>

        {/* Page Title */}
        <h1
          className="
            min-w-0
            flex-1
            truncate
            text-center
            text-lg
            font-bold
            text-white
            sm:text-xl
          "
        >
          العملاء
        </h1>

        {/* Mobile User */}
        <button
          type="button"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#1B1B1F]
            text-zinc-300
            sm:h-10
            sm:w-10
          "
        >
          <FiUser size={18} />
        </button>
      </div>

      {/* Search */}
      <div
        className="
          relative
          w-full
          lg:w-[420px]
          lg:max-w-[420px]
        "
      >
        <input
          type="text"
          placeholder="ابحث عن عميل أو فاتورة..."
          className="
            h-10
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-[#1B1B1F]
            py-2
            pr-10
            pl-4
            text-xs
            text-white
            placeholder:text-zinc-500
            outline-none
            transition
            focus:border-indigo-400
            sm:h-11
            sm:rounded-full
            sm:pr-11
            sm:text-sm
            lg:h-auto
            lg:py-3
          "
        />

        <FiSearch
          size={18}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-zinc-500
            sm:right-4
          "
        />
      </div>

      {/* Desktop Actions */}
      <div
        className="
          hidden
          items-center
          gap-4
          lg:flex
          lg:gap-5
        "
      >
        <div className="h-8 w-px bg-zinc-700" />

        <button
          type="button"
          className="text-zinc-300 transition hover:text-white"
          aria-label="المستخدم"
        >
          <FiUser size={22} />
        </button>

        <button
          type="button"
          className="text-zinc-300 transition hover:text-white"
          aria-label="الوضع الليلي"
        >
          <FiMoon size={22} />
        </button>

        <button
          type="button"
          className="
            relative
            text-zinc-300
            transition
            hover:text-white
          "
          aria-label="الإشعارات"
        >
          <FiBell size={22} />

          <span
            className="
              absolute
              -right-1
              -top-1
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>
      </div>
    </header>
  );
}