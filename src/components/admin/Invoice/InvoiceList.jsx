import React from "react";
import {
  FiCalendar,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";
import StatusBadge from "./StatusBadge";

const invoices = [
  {
    id: "INV-2024-001",
    customer: "محمد عبدالله",
    date: "15 مايو 2024",
    total: "1,250 ر.س",
    status: "paid",
  },
  {
    id: "INV-2024-002",
    customer: "أحمد خالد",
    date: "14 مايو 2024",
    total: "830 ر.س",
    status: "pending",
  },
  {
    id: "INV-2024-003",
    customer: "شركة الخليج",
    date: "13 مايو 2024",
    total: "2,540 ر.س",
    status: "overdue",
  },
  {
    id: "INV-2024-004",
    customer: "عبدالله محمد",
    date: "12 مايو 2024",
    total: "640 ر.س",
    status: "cancelled",
  },
  {
    id: "INV-2024-005",
    customer: "مؤسسة النور",
    date: "11 مايو 2024",
    total: "1,980 ر.س",
    status: "refunded",
  },
];

export default function InvoiceList() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 p-6">
        <div>
          <h2 className="text-xl font-bold text-white">
            الفواتير
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            آخر الفواتير الصادرة
          </p>
        </div>

        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-sm font-semibold text-blue-400">
          {invoices.length} فاتورة
        </span>
      </div>

      {/* List */}
      <div className="max-h-[650px] overflow-y-auto">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="border-b border-zinc-800 p-5 transition hover:bg-[#202020]"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {invoice.id}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {invoice.customer}
                </p>
              </div>

              <StatusBadge status={invoice.status} />
            </div>

            {/* Date */}
            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
              <FiCalendar />
              <span>{invoice.date}</span>
            </div>

            {/* Footer */}
            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-bold text-blue-400">
                {invoice.total}
              </span>

              <button className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400">
                <FiEye />
                عرض

                <FiArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}