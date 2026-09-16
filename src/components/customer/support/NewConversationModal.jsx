import { useState } from "react";

import {
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export default function NewConversationModal({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [subject, setSubject] =
    useState("");

  const [message, setMessage] =
    useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !subject.trim() ||
      !message.trim()
    ) {
      return;
    }

    await onSubmit({
      subject,
      message,
    });

    setSubject("");
    setMessage("");
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
    >
      <div className="my-auto w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-[#151515] shadow-2xl sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-zinc-800 p-3 sm:p-5">
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-white sm:text-base">
              محادثة جديدة
            </h2>

            <p className="mt-1 text-[10px] leading-5 text-zinc-500 sm:text-xs">
              اكتب مشكلتك وسيتواصل معك فريق الدعم
            </p>
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white sm:p-2"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-3 sm:space-y-5 sm:p-5"
        >
          {/* Subject */}
          <div>
            <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
              موضوع المشكلة
            </label>

            <input
              type="text"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              placeholder="مثال: مشكلة في الطلب"
              className="w-full min-w-0 rounded-xl border border-zinc-700 bg-[#0e0e0e] px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-600 sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
              الرسالة
            </label>

            <textarea
              rows={5}
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="اكتب تفاصيل المشكلة..."
              className="w-full resize-none rounded-xl border border-zinc-700 bg-[#0e0e0e] px-3 py-2.5 text-xs text-white outline-none transition placeholder:text-zinc-600 focus:border-blue-600 sm:px-4 sm:py-3 sm:text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              !subject.trim() ||
              !message.trim()
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-sm"
          >
            <PaperAirplaneIcon className="h-4 w-4 sm:h-5 sm:w-5" />

            {loading
              ? "جاري الإرسال..."
              : "إرسال الطلب"}
          </button>
        </form>
      </div>
    </div>
  );
}