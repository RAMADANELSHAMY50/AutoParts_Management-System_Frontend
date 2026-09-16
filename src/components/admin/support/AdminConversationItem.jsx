import {
  MessageCircle,
  User,
  Clock,
} from "lucide-react";

export default function AdminConversationItem({
  conversation,
  selected,
  onClick,
}) {
  const customer =
    conversation?.users_permissions_user;

  const customerName =
    customer?.username ||
    customer?.email ||
    "عميل";

  const isOpen =
    conversation?.status1 === "مفتوحة";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        border-b
        border-zinc-800
        p-3
        text-right
        transition
        sm:p-4

        ${
          selected
            ? "bg-blue-600/10"
            : "hover:bg-[#1b1b1b]"
        }
      `}
    >
      <div className="flex min-w-0 gap-3">

        {/* Avatar */}
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            sm:h-11
            sm:w-11

            ${
              selected
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400"
            }
          `}
        >
          <User size={18} />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">

          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
              gap-1

              sm:flex-row
              sm:items-start
              sm:justify-between
              sm:gap-2
            "
          >
            <h3 className="max-w-full truncate text-sm font-semibold text-white">
              {conversation?.subject ||
                "بدون عنوان"}
            </h3>

            <span
              className={`
                shrink-0
                rounded-full
                px-2
                py-1
                text-[9px]
                sm:text-[10px]

                ${
                  isOpen
                    ? "bg-green-500/10 text-green-400"
                    : "bg-zinc-700/40 text-zinc-400"
                }
              `}
            >
              {conversation?.status1}
            </span>
          </div>

          <p className="mt-1 truncate text-xs text-zinc-500">
            {customerName}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-zinc-600 sm:text-[11px]">

            <span className="flex items-center gap-1">
              <MessageCircle size={12} />
              محادثة
            </span>

            {conversation?.updatedAt && (
              <span className="flex items-center gap-1">
                <Clock size={12} />

                {new Date(
                  conversation.updatedAt
                ).toLocaleDateString("ar-EG")}
              </span>
            )}

          </div>
        </div>
      </div>
    </button>
  );
}