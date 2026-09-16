import { useEffect, useRef, useState } from "react";

import {
  PaperAirplaneIcon,
  XMarkIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import MessageBubble from "./MessageBubble";
import SupportEmptyState from "./SupportEmptyState";

export default function ChatWindow({
  conversation,
  messages = [],
  onSendMessage,
  onCloseConversation,
  onNewConversation,
  loading = false,
}) {
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  if (!conversation) {
    return (
      <SupportEmptyState
        onNewConversation={onNewConversation}
      />
    );
  }

  const isClosed = conversation.status1 === "مغلقة";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || isClosed || loading) {
      return;
    }

    await onSendMessage(message);

    setMessage("");
  };

  return (
    <div
      dir="rtl"
      className="flex min-h-[500px] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#131313] sm:min-h-[600px] sm:rounded-2xl"
    >
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-3 border-b border-zinc-800 p-3 sm:items-center sm:p-4">
        {/* Conversation Info */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-bold text-white sm:text-base">
            {conversation.subject || "طلب دعم"}
          </h2>

          <span
            className={`mt-1 inline-flex rounded-full px-2 py-1 text-[10px] sm:text-[11px] ${
              isClosed
                ? "bg-green-500/10 text-green-400"
                : "bg-blue-500/10 text-blue-400"
            }`}
          >
            {conversation.status1}
          </span>
        </div>

        {/* Close */}
        {!isClosed && (
          <button
            onClick={onCloseConversation}
            disabled={loading}
            className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-2 text-[10px] text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-3 sm:text-xs"
          >
            <XMarkIcon className="h-4 w-4" />

            <span className="hidden min-[400px]:inline">
              إغلاق المحادثة
            </span>

            <span className="min-[400px]:hidden">
              إغلاق
            </span>
          </button>
        )}

        {isClosed && (
          <div className="flex shrink-0 items-center gap-1 text-[10px] text-green-400 sm:text-xs">
            <CheckCircleIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            مغلقة
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:space-y-4 sm:p-5">
        {messages.length === 0 ? (
          <div className="flex h-full min-h-[300px] items-center justify-center text-xs text-zinc-500 sm:min-h-[400px] sm:text-sm">
            لا توجد رسائل
          </div>
        ) : (
          messages.map((item) => (
            <MessageBubble
              key={item.documentId || item.id}
              message={item}
            />
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {!isClosed ? (
        <form
          onSubmit={handleSubmit}
          className="border-t border-zinc-800 p-3 sm:p-4"
        >
          <div className="flex items-end gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={2}
              placeholder="اكتب رسالتك..."
              className="min-h-[48px] min-w-0 flex-1 resize-none rounded-xl border border-zinc-700 bg-[#0e0e0e] px-3 py-2.5 text-xs text-white outline-none placeholder:text-zinc-600 focus:border-blue-600 sm:min-h-[50px] sm:px-4 sm:py-3 sm:text-sm"
            />

            <button
              type="submit"
              disabled={
                loading || !message.trim()
              }
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px] sm:w-[50px]"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-2 text-[9px] text-zinc-600 sm:text-[11px]">
            Enter للإرسال — Shift + Enter لسطر جديد
          </p>
        </form>
      ) : (
        <div className="border-t border-zinc-800 p-3 text-center text-xs text-zinc-500 sm:p-4 sm:text-sm">
          هذه المحادثة مغلقة ولا يمكن إرسال رسائل جديدة.
        </div>
      )}
    </div>
  );
}