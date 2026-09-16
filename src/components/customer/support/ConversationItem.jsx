import {
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function ConversationItem({
  conversation,
  selected,
  onClick,
}) {
  const status =
    conversation?.status1 || "مفتوحة";

  const isClosed = status === "مغلقة";

  const date = conversation?.updatedAt
    ? new Date(
        conversation.updatedAt
      ).toLocaleDateString("ar-EG", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <button
      onClick={onClick}
      className={`w-full min-w-0 rounded-xl border p-3 text-right transition sm:p-4 ${
        selected
          ? "border-blue-600 bg-blue-600/10"
          : "border-zinc-800 bg-[#171717] hover:border-zinc-700 hover:bg-[#1c1c1c]"
      }`}
    >
      <div className="flex min-w-0 items-start gap-2.5 sm:gap-3">
        {/* Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 ${
            isClosed
              ? "bg-green-500/10 text-green-500"
              : "bg-blue-500/10 text-blue-500"
          }`}
        >
          {isClosed ? (
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          ) : (
            <ChatBubbleLeftRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex min-w-0 items-start justify-between gap-2">
            <h3 className="min-w-0 flex-1 truncate text-xs font-semibold text-white sm:text-sm">
              {conversation?.subject || "طلب دعم"}
            </h3>

            <span className="shrink-0 text-[9px] text-zinc-500 sm:text-xs">
              {date}
            </span>
          </div>

          <span
            className={`inline-flex max-w-full items-center gap-1 rounded-full px-2 py-1 text-[10px] sm:text-[11px] ${
              isClosed
                ? "bg-green-500/10 text-green-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {isClosed ? (
              <CheckCircleIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            ) : (
              <ClockIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            )}

            <span className="truncate">
              {status}
            </span>
          </span>
        </div>
      </div>
    </button>
  );
}