import React from "react";
import {
  FiCalendar,
  FiUser,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

export default function InvoiceCard({
  invoice,
  active = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
        active
          ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10"
          : "border-zinc-800 bg-[#181818] hover:border-zinc-700 hover:bg-[#202020]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            {invoice.id}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            فاتورة ضريبية
          </p>
        </div>

        <StatusBadge status={invoice.status} />
      </div>

      {/* Customer */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
          <FiUser className="text-white" />
        </div>

        <div>
          <p className="font-medium text-white">
            {invoice.customer}
          </p>

          <p className="text-sm text-zinc-500">
            العميل
          </p>
        </div>
      </div>

      {/* Date */}
      <div className="mt-5 flex items-center gap-2 text-sm text-zinc-400">
        <FiCalendar />

        <span>{invoice.date}</span>
      </div>

      {/* Total */}
      <div className="mt-6 rounded-xl bg-[#202020] p-4">
        <p className="text-sm text-zinc-500">
          إجمالي الفاتورة
        </p>

        <h2 className="mt-1 text-2xl font-bold text-blue-400">
          {invoice.total}
        </h2>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button className="flex items-center gap-2 rounded-xl bg-[#2A2A2A] px-4 py-2 text-sm text-white transition hover:bg-[#3A3A3A]">
          <FiEye />

          عرض
        </button>

        <button className="flex items-center gap-2 text-blue-400 transition hover:text-blue-300">
          التفاصيل

          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}