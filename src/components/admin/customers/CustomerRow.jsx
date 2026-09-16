import React from "react";
import {
  FiEye,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";

export default function CustomerRow({ customer }) {
  return (
    <tr
      className="
        border-b
        border-zinc-800
        transition-colors
        hover:bg-[#1E1E1E]
      "
    >
      {/* Customer */}
      <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-xs font-semibold text-white sm:text-sm lg:text-base">
              {customer.username || "بدون اسم"}
            </h3>

            <p className="mt-0.5 text-[10px] text-zinc-400 sm:mt-1 sm:text-xs lg:text-sm">
              {customer.type || "عميل"}
            </p>
          </div>
        </div>
      </td>

      {/* Contact */}
      <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div className="space-y-0.5 sm:space-y-1">
          <p className="text-xs text-white sm:text-sm lg:text-base">
            {customer.phone || "—"}
          </p>

          <p className="text-[10px] text-zinc-400 sm:text-xs lg:text-sm">
            {customer.email || "—"}
          </p>
        </div>
      </td>

      {/* Purchases */}
      <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div>
          <p className="text-xs font-semibold text-white sm:text-sm lg:text-base">
            {customer.total || "0"}
          </p>

          <p className="text-[10px] text-zinc-400 sm:text-xs lg:text-sm">
            {customer.invoices || 0} فاتورة
          </p>
        </div>
      </td>

      {/* Last Visit */}
      <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div>
          <p className="text-xs text-white sm:text-sm lg:text-base">
            {customer.updatedAt || "—"}
          </p>

          <p className="text-[10px] text-zinc-400 sm:text-xs lg:text-sm">
            {customer.since || "—"}
          </p>
        </div>
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <span
          className={`
            inline-flex
            items-center
            rounded-full
            px-2
            py-1
            text-[10px]
            font-medium
            sm:px-3
            sm:text-xs
            lg:px-4
            lg:py-1
            lg:text-sm
            ${
              customer.status === "نشط"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }
          `}
        >
          <span
            className={`
              ml-1.5
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              sm:ml-2
              sm:h-2
              sm:w-2
              ${
                customer.status === "نشط"
                  ? "bg-green-400"
                  : "bg-red-400"
              }
            `}
          />

          {customer.status || "غير محدد"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-3 py-3 sm:px-5 sm:py-4 lg:px-6 lg:py-5">
        <div className="flex justify-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#242424]
              text-zinc-300
              transition
              hover:bg-blue-500
              hover:text-white
              sm:h-9
              sm:w-9
            "
            aria-label="عرض العميل"
          >
            <FiEye size={15} className="sm:hidden" />
            <FiEye size={17} className="hidden sm:block" />
          </button>

          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#242424]
              text-zinc-300
              transition
              hover:bg-yellow-500
              hover:text-white
              sm:h-9
              sm:w-9
            "
            aria-label="تعديل العميل"
          >
            <FiEdit2 size={15} className="sm:hidden" />
            <FiEdit2 size={17} className="hidden sm:block" />
          </button>

          <button
            type="button"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#242424]
              text-zinc-300
              transition
              hover:bg-red-500
              hover:text-white
              sm:h-9
              sm:w-9
            "
            aria-label="حذف العميل"
          >
            <FiTrash2 size={15} className="sm:hidden" />
            <FiTrash2 size={17} className="hidden sm:block" />
          </button>
        </div>
      </td>
    </tr>
  );
}