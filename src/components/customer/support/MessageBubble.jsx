export default function MessageBubble({
  message,
}) {
  const isCustomer =
    message?.sender === "عميل";

  const date = message?.createdAt
    ? new Date(
        message.createdAt
      ).toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      dir="rtl"
      className={`flex w-full ${
        isCustomer
          ? "justify-start"
          : "justify-end"
      }`}
    >
      <div
        className={`max-w-[88%] break-words rounded-2xl px-3 py-2.5 sm:max-w-[80%] sm:px-4 sm:py-3 ${
          isCustomer
            ? "rounded-tr-md bg-blue-600 text-white"
            : "rounded-tl-md border border-zinc-700 bg-[#202020] text-zinc-200"
        }`}
      >
        <div className="mb-1 text-[10px] opacity-60 sm:text-[11px]">
          {isCustomer ? "أنت" : "الدعم"}
        </div>

        <p className="whitespace-pre-wrap break-words text-xs leading-5 sm:text-sm sm:leading-6">
          {message?.message}
        </p>

        {date && (
          <div className="mt-1 text-left text-[9px] opacity-50 sm:text-[10px]">
            {date}
          </div>
        )}
      </div>
    </div>
  );
}