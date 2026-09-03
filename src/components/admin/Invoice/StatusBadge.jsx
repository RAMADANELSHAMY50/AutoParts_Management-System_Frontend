import React from "react";

const statusStyles = {
  paid: {
    text: "مدفوعة",
    className:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  },

  pending: {
    text: "بانتظار الدفع",
    className:
      "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  },

  overdue: {
    text: "متأخرة",
    className:
      "bg-red-500/15 text-red-400 border border-red-500/20",
  },

  cancelled: {
    text: "ملغاة",
    className:
      "bg-zinc-500/15 text-zinc-400 border border-zinc-500/20",
  },

  refunded: {
    text: "مستردة",
    className:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
  },
};

export default function StatusBadge({
  status = "paid",
  className = "",
}) {
  const badge = statusStyles[status] || statusStyles.pending;

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        whitespace-nowrap
        ${badge.className}
        ${className}
      `}
    >
      {badge.text}
    </span>
  );
}