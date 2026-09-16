import {
  Inbox,
  Search,
} from "lucide-react";

import { useMemo, useState } from "react";

import AdminConversationItem from "./AdminConversationItem";

export default function AdminConversationList({
  conversations = [],
  selectedConversation,
  onSelect,
  loading = false,
}) {
  const [search, setSearch] = useState("");

  const filteredConversations = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return conversations;
    }

    return conversations.filter((conversation) => {
      const subject =
        conversation?.subject || "";

      const customer =
        conversation?.users_permissions_user;

      const username =
        customer?.username || "";

      const email =
        customer?.email || "";

      return (
        subject.toLowerCase().includes(value) ||
        username.toLowerCase().includes(value) ||
        email.toLowerCase().includes(value)
      );
    });
  }, [conversations, search]);

  return (
    <div
      className="
        flex
        min-h-[500px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-[#151515]

        xl:min-h-[650px]
      "
    >
      {/* Header */}
      <div className="border-b border-zinc-800 p-3 sm:p-4">

        <div className="mb-3 flex items-center gap-2">
          <Inbox
            size={18}
            className="text-blue-500"
          />

          <h2 className="font-semibold text-white">
            المحادثات
          </h2>

          <span className="mr-auto rounded-full bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400 sm:text-xs">
            {filteredConversations.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-zinc-600
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="ابحث عن محادثة..."
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-[#1b1b1b]
              py-2.5
              pl-3
              pr-10
              text-xs
              text-white
              outline-none
              placeholder:text-zinc-600
              focus:border-blue-600
              sm:text-sm
            "
          />
        </div>
      </div>

      {/* List */}
      <div
        className="
          flex-1
          overflow-y-auto
          xl:max-h-[560px]
        "
      >
        {loading && conversations.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-zinc-500">
            جاري تحميل المحادثات...
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center px-5 text-center">
            <Inbox
              size={38}
              className="mb-3 text-zinc-700"
            />

            <p className="font-medium text-zinc-400">
              لا توجد محادثات
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              عندما يرسل عميل رسالة ستظهر هنا
            </p>
          </div>
        ) : (
          filteredConversations.map(
            (conversation) => (
              <AdminConversationItem
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
            )
          )
        )}
      </div>
    </div>
  );
}