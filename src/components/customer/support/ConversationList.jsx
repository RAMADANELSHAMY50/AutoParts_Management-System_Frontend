import ConversationItem from "./ConversationItem";

import {
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function ConversationList({
  conversations = [],
  selectedConversation,
  onSelect,
}) {
  return (
    <div
      dir="rtl"
      className="flex h-full min-h-[400px] flex-col rounded-xl border border-zinc-800 bg-[#131313] sm:min-h-[600px] sm:rounded-2xl"
    >
      {/* Header */}
      <div className="border-b border-zinc-800 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white sm:text-base">
            محادثاتي
          </h2>

          <span className="shrink-0 rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] text-zinc-400 sm:text-xs">
            {conversations.length}
          </span>
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 space-y-2 overflow-y-auto p-2.5 sm:p-3">
        {conversations.length === 0 ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center px-4 text-center sm:min-h-[450px] sm:px-5">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-zinc-500 sm:h-16 sm:w-16">
              <ChatBubbleLeftRightIcon className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>

            <h3 className="text-sm font-semibold text-white sm:text-base">
              لا توجد محادثات
            </h3>

            <p className="mt-2 text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
              لم تقم بإنشاء أي محادثة مع الدعم حتى الآن.
            </p>

            <p className="mt-4 text-[10px] leading-5 text-zinc-600 sm:text-xs">
              اضغط على "محادثة جديدة" بالأعلى
              لبدء التواصل مع الدعم.
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={
                conversation.documentId ||
                conversation.id
              }
              conversation={conversation}
              selected={
                selectedConversation?.documentId ===
                  conversation.documentId ||
                selectedConversation?.id ===
                  conversation.id
              }
              onClick={() =>
                onSelect(conversation)
              }
            />
          ))
        )}
      </div>
    </div>
  );
}