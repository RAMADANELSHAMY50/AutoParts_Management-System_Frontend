import React from "react";
import { FiPlus } from "react-icons/fi";

export default function AddCustomerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl bg-indigo-400 px-5 py-3 font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-95"
    >
      <FiPlus size={20} />
      <span>إضافة عميل جديد</span>
    </button>
  );
}