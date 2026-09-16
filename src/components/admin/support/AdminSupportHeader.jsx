import {
  Headphones,
  RefreshCw,
} from "lucide-react";

export default function AdminSupportHeader({
  conversations = [],
  onRefresh,
  loading = false,
}) {
  const openCount = conversations.filter(
    (item) => item.status1 === "مفتوحة"
  ).length;

  const closedCount = conversations.filter(
    (item) => item.status1 === "مغلقة"
  ).length;

  return (
    <div
      className="
        mb-5
        rounded-2xl
        border
        border-zinc-800
        bg-[#151515]
        p-4
        sm:mb-6
        sm:p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        {/* Title */}
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-blue-600/10
              text-blue-500
              sm:h-12
              sm:w-12
            "
          >
            <Headphones size={22} className="sm:hidden" />
            <Headphones
              size={25}
              className="hidden sm:block"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold text-white sm:text-xl">
              الدعم الفني
            </h1>

            <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
              إدارة محادثات العملاء والرد على استفساراتهم
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-2
            gap-2
            sm:flex
            sm:flex-wrap
            sm:items-center
            sm:gap-3
          "
        >
          {/* Total */}
          <div className="rounded-xl border border-zinc-800 bg-[#1b1b1b] px-3 py-2 sm:px-4">
            <span className="text-[10px] text-zinc-500 sm:text-xs">
              إجمالي المحادثات
            </span>

            <p className="font-bold text-white">
              {conversations.length}
            </p>
          </div>

          {/* Open */}
          <div className="rounded-xl border border-zinc-800 bg-[#1b1b1b] px-3 py-2 sm:px-4">
            <span className="text-[10px] text-zinc-500 sm:text-xs">
              مفتوحة
            </span>

            <p className="font-bold text-green-400">
              {openCount}
            </p>
          </div>

          {/* Closed */}
          <div className="rounded-xl border border-zinc-800 bg-[#1b1b1b] px-3 py-2 sm:px-4">
            <span className="text-[10px] text-zinc-500 sm:text-xs">
              مغلقة
            </span>

            <p className="font-bold text-zinc-400">
              {closedCount}
            </p>
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="
              flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-zinc-700
              bg-[#1b1b1b]
              px-3
              text-xs
              text-zinc-300
              transition
              hover:border-blue-500
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:h-11
              sm:px-4
              sm:text-sm
            "
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />

            <span>تحديث</span>
          </button>
        </div>
      </div>
    </div>
  );
}