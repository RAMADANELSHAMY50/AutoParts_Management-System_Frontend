import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { toast } from "react-hot-toast";

import Sidebar from "../../components/admin/layout/Sidebar";

import AdminSupportHeader from "../../components/admin/support/AdminSupportHeader";
import AdminConversationList from "../../components/admin/support/AdminConversationList";
import AdminChatWindow from "../../components/admin/support/AdminChatWindow";

import {
  getAdminConversations,
  getAdminMessages,
  sendAdminMessage,
  closeAdminConversation,
  reopenAdminConversation,
} from "../../services/adminSupportService";

export default function Support() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] =
    useState(null);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // ==========================================
  // Mobile Sidebar
  // ==========================================
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ==========================================
  // Load Conversations
  // ==========================================
  const loadConversations = useCallback(
    async (keepSelected = true) => {
      try {
        setLoading(true);

        const data = await getAdminConversations();

        setConversations(data);

        if (keepSelected && selectedConversation) {
          const updated = data.find(
            (item) =>
              item.documentId === selectedConversation.documentId ||
              item.id === selectedConversation.id
          );

          if (updated) {
            setSelectedConversation(updated);
          }
        }
      } catch (error) {
        console.error(
          "ADMIN GET CONVERSATIONS ERROR:",
          error.response?.data || error
        );

        toast.error("تعذر تحميل محادثات الدعم");
      } finally {
        setLoading(false);
      }
    },
    [selectedConversation]
  );

  // ==========================================
  // Load Messages
  // ==========================================
  const loadMessages = useCallback(async (conversation) => {
    if (!conversation) {
      setMessages([]);
      return;
    }

    try {
      setMessagesLoading(true);

      const data = await getAdminMessages(conversation);

      setMessages(data);
    } catch (error) {
      console.error(
        "ADMIN GET MESSAGES ERROR:",
        error.response?.data || error
      );

      toast.error("تعذر تحميل الرسائل");
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    loadConversations(false);
  }, []);

  // ==========================================
  // Select Conversation
  // ==========================================
  const handleSelectConversation = async (conversation) => {
    setSelectedConversation(conversation);

    await loadMessages(conversation);
  };

  // ==========================================
  // Refresh
  // ==========================================
  const handleRefresh = async () => {
    await loadConversations();

    if (selectedConversation) {
      await loadMessages(selectedConversation);
    }
  };

  // ==========================================
  // Send Admin Reply
  // ==========================================
  const handleSendMessage = async (text) => {
    if (!selectedConversation) {
      return;
    }

    try {
      setMessagesLoading(true);

      const newMessage = await sendAdminMessage({
        conversation: selectedConversation,
        message: text,
      });

      if (newMessage) {
        setMessages((prev) => [...prev, newMessage]);
      }

      const data = await getAdminConversations();

      setConversations(data);

      const updated = data.find(
        (item) =>
          item.documentId === selectedConversation.documentId ||
          item.id === selectedConversation.id
      );

      if (updated) {
        setSelectedConversation(updated);
      }

      toast.success("تم إرسال الرد");
    } catch (error) {
      console.error(
        "ADMIN SEND MESSAGE ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.error?.message ||
          error.message ||
          "تعذر إرسال الرد"
      );
    } finally {
      setMessagesLoading(false);
    }
  };

  // ==========================================
  // Close Conversation
  // ==========================================
  const handleCloseConversation = async () => {
    if (!selectedConversation) {
      return;
    }

    try {
      setLoading(true);

      const updated = await closeAdminConversation(
        selectedConversation
      );

      setSelectedConversation(updated);

      const data = await getAdminConversations();

      setConversations(data);

      const refreshed = data.find(
        (item) =>
          item.documentId === updated.documentId ||
          item.id === updated.id
      );

      if (refreshed) {
        setSelectedConversation(refreshed);
      }

      toast.success("تم إغلاق المحادثة");
    } catch (error) {
      console.error(
        "ADMIN CLOSE ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.error?.message ||
          "تعذر إغلاق المحادثة"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Reopen Conversation
  // ==========================================
  const handleReopenConversation = async () => {
    if (!selectedConversation) {
      return;
    }

    try {
      setLoading(true);

      const updated = await reopenAdminConversation(
        selectedConversation
      );

      const data = await getAdminConversations();

      setConversations(data);

      const refreshed = data.find(
        (item) =>
          item.documentId === updated.documentId ||
          item.id === updated.id
      );

      if (refreshed) {
        setSelectedConversation(refreshed);
      }

      toast.success("تم إعادة فتح المحادثة");
    } catch (error) {
      console.error(
        "ADMIN REOPEN ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.error?.message ||
          "تعذر إعادة فتح المحادثة"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        min-w-0
        bg-[#0e0e0e]
        text-white
      "
    >
      <div className="flex min-h-screen">

        {/* ======================================
            Sidebar
        ====================================== */}
        <Sidebar
          isMobileOpen={isSidebarOpen}
          setIsMobileOpen={setIsSidebarOpen}
        />

        {/* ======================================
            Main
        ====================================== */}
        <main
          className="
            min-w-0
            flex-1
            px-3
            py-4
            sm:px-4
            sm:py-5
            md:px-6
            lg:px-8
            lg:py-6
          "
        >
          <div className="mx-auto w-full max-w-[1700px]">

            {/* ======================================
                Mobile Header
            ====================================== */}
            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                lg:hidden
              "
            >
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="فتح القائمة"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-zinc-800
                  bg-[#171717]
                  text-zinc-300
                  transition
                  hover:border-blue-500
                  hover:text-white
                  sm:h-11
                  sm:w-11
                "
              >
                <Menu size={23} />
              </button>

              <div className="min-w-0 text-right">
                <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                  الدعم الفني
                </h1>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  إدارة محادثات العملاء
                </p>
              </div>
            </div>

            {/* ======================================
                Header
            ====================================== */}
            <AdminSupportHeader
              conversations={conversations}
              onRefresh={handleRefresh}
              loading={loading || messagesLoading}
            />

            {/* ======================================
                Support Layout
            ====================================== */}
            <div
              className="
                grid
                min-w-0
                grid-cols-1
                gap-4
                sm:gap-5
                xl:grid-cols-[380px_minmax(0,1fr)]
              "
            >
              {/* Conversations */}
              <AdminConversationList
                conversations={conversations}
                selectedConversation={selectedConversation}
                onSelect={handleSelectConversation}
                loading={loading}
              />

              {/* Chat */}
              <AdminChatWindow
                conversation={selectedConversation}
                messages={messages}
                onSendMessage={handleSendMessage}
                onCloseConversation={handleCloseConversation}
                onReopenConversation={handleReopenConversation}
                loading={loading || messagesLoading}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}