import React from "react";
import { FiPlus } from "react-icons/fi";

export default function AddCustomerButton({
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-1.5
        rounded-lg
        bg-indigo-400
        px-3
        py-2.5
        text-xs
        font-semibold
        text-slate-900
        shadow-lg
        transition-all
        duration-300
        hover:bg-indigo-500
        hover:shadow-indigo-500/30
        active:scale-95
        sm:w-auto
        sm:gap-2
        sm:rounded-xl
        sm:px-4
        sm:py-3
        sm:text-sm
        lg:px-5
      "
    >
      <FiPlus size={17} className="sm:hidden" />
      <FiPlus size={20} className="hidden sm:block" />

      <span>إضافة عميل جديد</span>
    </button>
  );
}