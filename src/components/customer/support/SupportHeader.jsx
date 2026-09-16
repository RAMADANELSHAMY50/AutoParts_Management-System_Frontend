import {
  ArrowPathIcon,
  PlusIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/outline";

export default function SupportHeader({
  onRefresh,
  onNewConversation,
  loading = false,
}) {
  return (
    <div
      dir="rtl"
      className="mb-4 rounded-xl border border-zinc-800 bg-[#131313] p-3 sm:mb-6 sm:rounded-2xl sm:p-5"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 sm:h-12 sm:w-12 sm:rounded-xl">
            <LifebuoyIcon className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white sm:text-xl">
              الدعم والمساعدة
            </h1>

            <p className="mt-1 truncate text-[10px] text-zinc-400 sm:text-sm">
              تواصل مع فريق الدعم وسنساعدك في حل مشكلتك
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-900 px-2.5 py-2.5 text-xs text-zinc-300 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <ArrowPathIcon
              className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${
                loading ? "animate-spin" : ""
              }`}
            />

            <span>تحديث</span>
          </button>

          <button
            onClick={onNewConversation}
            className="flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-2.5 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <PlusIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

            <span className="truncate">
              محادثة جديدة
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}