import React from "react";
import {
  FiPrinter,
  FiDownload,
  FiShare2,
  FiEye,
} from "react-icons/fi";

export default function InvoiceActions() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111111] px-6 py-4">
      {/* Left Actions */}
      <div className="flex items-center gap-3">
        {/* Print */}
        <button className="flex items-center gap-2 rounded-xl bg-[#A8B9FF] px-5 py-3 font-semibold text-[#111111] transition hover:opacity-90">
          <FiPrinter className="text-lg" />
          <span>طباعة الفاتورة</span>
        </button>

        {/* PDF */}
        <button className="flex items-center gap-2 rounded-xl bg-[#232323] px-5 py-3 text-white transition hover:bg-[#2f2f2f]">
          <FiDownload className="text-lg" />
          <span>تحميل PDF</span>
        </button>

        {/* Share */}
        <button className="flex items-center gap-2 rounded-xl bg-[#232323] px-5 py-3 text-white transition hover:bg-[#2f2f2f]">
          <FiShare2 className="text-lg" />
          <span>مشاركة</span>
        </button>
      </div>

      {/* Invoice Info */}
      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs text-zinc-500">رقم الفاتورة</p>
          <h3 className="text-lg font-bold text-white">
            INV-2024-001
          </h3>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#232323] px-5 py-3 text-white transition hover:bg-[#2f2f2f]">
          <FiEye />
          <span>معاينة الفاتورة</span>
        </button>
      </div>
    </div>
  );
}