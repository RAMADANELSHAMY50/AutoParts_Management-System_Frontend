import {
  FiCalendar,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";

import StatusBadge from "./StatusBadge";

export default function InvoiceList({
  invoices = [],
  selectedInvoice,
  setSelectedInvoice,
  loading,
}) {
  if (loading) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-[#181818] p-4 sm:rounded-2xl sm:p-6">
        <p className="text-sm text-zinc-400">
          جاري تحميل الفواتير...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#181818] sm:rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 p-4 sm:p-5 lg:p-6">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            الفواتير
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            آخر الفواتير الصادرة
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-blue-500/15 px-2.5 py-1 text-[10px] font-semibold text-blue-400 sm:px-3 sm:text-sm">
          {invoices.length} فاتورة
        </span>
      </div>

      {/* Empty */}
      {invoices.length === 0 && (
        <div className="p-8 text-center text-sm text-zinc-500">
          لا توجد فواتير حتى الآن
        </div>
      )}

      {/* List */}
      <div className="max-h-none overflow-visible lg:max-h-[650px] lg:overflow-y-auto">
        {invoices.map((invoice) => {
          const isSelected =
            selectedInvoice?.id ===
            invoice.id;

          return (
            <div
              key={
                invoice.documentId ||
                invoice.id
              }
              onClick={() =>
                setSelectedInvoice(invoice)
              }
              className={`cursor-pointer border-b border-zinc-800 p-3 transition last:border-b-0 sm:p-4 lg:p-5 ${
                isSelected
                  ? "bg-[#202020]"
                  : "hover:bg-[#202020]"
              }`}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                    {invoice.orderNumber ||
                      "---"}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                    فاتورة بيع
                  </p>
                </div>

                <StatusBadge
                  status={
                    invoice.State ===
                    "مكتمل"
                      ? "paid"
                      : "pending"
                  }
                />
              </div>

              {/* Date */}
              <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 sm:mt-4 sm:text-sm">
                <FiCalendar size={15} />

                <span>
                  {invoice.createdAt
                    ? new Date(
                        invoice.createdAt
                      ).toLocaleDateString(
                        "ar-EG"
                      )
                    : "---"}
                </span>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between gap-3 sm:mt-5">
                <span className="text-base font-bold text-blue-400 sm:text-lg">
                  {Number(
                    invoice.total || 0
                  ).toFixed(2)}{" "}
                  ر.س
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedInvoice(
                      invoice
                    );
                  }}
                  className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-700 px-3 text-xs text-zinc-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 sm:h-10 sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <FiEye size={15} />

                  عرض

                  <FiArrowRight
                    size={15}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}