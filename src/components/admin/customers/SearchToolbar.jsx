import React from "react";
import {
  FiSearch,
  FiFilter,
} from "react-icons/fi";

export default function SearchToolbar({
  customer,
}) {
  return (
    <div
      className="
        flex
        w-full
        min-w-0
        flex-col
        gap-3
        border-b
        border-zinc-800
        p-3
        sm:p-4
        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:p-5
      "
    >
      {/* Title */}
      <div
        className="
          flex
          min-w-0
          flex-col
          items-start
          gap-1.5
          sm:flex-row
          sm:items-center
          sm:gap-3
        "
      >
        <h2
          className="
            text-base
            font-bold
            text-white
            sm:text-lg
            lg:text-xl
          "
        >
          قائمة العملاء
        </h2>

        <span
          className="
            max-w-full
            truncate
            rounded-full
            border
            border-indigo-400/30
            bg-indigo-500/20
            px-2.5
            py-1
            text-[10px]
            text-indigo-300
            sm:px-3
            sm:text-xs
            lg:px-4
            lg:text-sm
          "
        >
          {customer} عميل تم العثور عليهم
        </span>
      </div>

      {/* Search & Filter */}
      <div
        className="
          flex
          w-full
          min-w-0
          items-center
          gap-2
          sm:gap-3
          lg:w-auto
        "
      >
        {/* Search */}
        <div className="relative min-w-0 flex-1 lg:w-80 lg:flex-none">
          <input
            type="text"
            placeholder="ابحث بالاسم أو الهاتف..."
            className="
              h-10
              w-full
              rounded-lg
              border
              border-zinc-700
              bg-[#1B1B1F]
              py-2
              pr-9
              pl-3
              text-xs
              text-white
              placeholder:text-zinc-500
              outline-none
              transition
              focus:border-indigo-400
              sm:h-11
              sm:rounded-xl
              sm:pr-10
              sm:text-sm
              lg:h-12
              lg:pr-12
              lg:pl-4
            "
          />

          <FiSearch
            size={16}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-500
              sm:right-3.5
              lg:right-4
            "
          />
        </div>

        {/* Filter */}
        <button
          type="button"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-zinc-700
            bg-[#1B1B1F]
            text-zinc-300
            transition
            hover:border-indigo-400
            hover:text-white
            sm:h-11
            sm:w-11
            sm:rounded-xl
            lg:h-12
            lg:w-12
          "
          aria-label="فلترة العملاء"
        >
          <FiFilter size={17} className="sm:hidden" />
          <FiFilter size={19} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
}