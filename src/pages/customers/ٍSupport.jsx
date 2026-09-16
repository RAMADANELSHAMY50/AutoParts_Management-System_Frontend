
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import SupportHeader from "../../components/customer/support/SupportHeader";
import ConversationList from "../../components/customer/support/ConversationList";
import ChatWindow from "../../components/customer/support/ChatWindow";
import NewConversationModal from "../../components/customer/support/NewConversationModal";

import {
  getCurrentUser,
  getConversations,
  getMessages,
  createConversation,
  sendMessage,
  closeConversation,
} from "../../services/supportService";

import Navbar from "../../components/customer/layout/Navbar";

export default function Support() {
  const [user, setUser] = useState(null);

  const [conversations, setConversations] =
    useState([]);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState(null);

  const [messages, setMessages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [
    messagesLoading,
    setMessagesLoading,
  ] = useState(false);

  const [modalOpen, setModalOpen] =
    useState(false);

  // ==========================================
  // Load User
  // ==========================================
  const loadUser = useCallback(async () => {
    try {
      const currentUser =
        await getCurrentUser();

      setUser(currentUser);

      return currentUser;
    } catch (error) {
      console.error(
        "GET USER ERROR:",
        error.response?.data || error
      );

      toast.error(
        "تعذر تحميل بيانات المستخدم"
      );

      return null;
    }
  }, []);

  // ==========================================
  // Load Conversations
  // ==========================================
  const loadConversations = useCallback(
    async (currentUser) => {
      if (!currentUser?.id) {
        return [];
      }

      try {
        setLoading(true);

        const data =
          await getConversations(
            currentUser
          );

        setConversations(data);

        // ======================================
        // Update selected conversation safely
        // ======================================
        setSelectedConversation(
          (previousSelected) => {
            if (!previousSelected) {
              return null;
            }

            const updated =
              data.find(
                (item) =>
                  item.documentId ===
                  previousSelected.documentId ||
                  item.id ===
                  previousSelected.id
              );

            return updated || previousSelected;
          }
        );

        return data;
      } catch (error) {
        console.error(
          "GET CONVERSATIONS ERROR:",
          error.response?.data || error
        );

        toast.error(
          "تعذر تحميل المحادثات"
        );

        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Load Messages
  // ==========================================
  const loadMessages = useCallback(
    async (conversation) => {
      if (!conversation) {
        setMessages([]);
        return;
      }

      try {
        setMessagesLoading(true);

        const data =
          await getMessages(
            conversation
          );

        setMessages(data);
      } catch (error) {
        console.error(
          "GET MESSAGES ERROR:",
          error.response?.data || error
        );

        toast.error(
          "تعذر تحميل الرسائل"
        );
      } finally {
        setMessagesLoading(false);
      }
    },
    []
  );

  // ==========================================
  // Initial Load
  // ==========================================
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const currentUser =
        await loadUser();

      if (!mounted || !currentUser) {
        return;
      }

      await loadConversations(
        currentUser
      );
    };

    init();

    return () => {
      mounted = false;
    };
  }, [
    loadUser,
    loadConversations,
  ]);

  // ==========================================
  // Select Conversation
  // ==========================================
  const handleSelectConversation =
    async (conversation) => {
      setSelectedConversation(
        conversation
      );

      await loadMessages(
        conversation
      );
    };

  // ==========================================
  // Refresh
  // ==========================================
  const handleRefresh = async () => {
    if (!user) {
      return;
    }

    const data =
      await loadConversations(user);

    // ========================================
    // Refresh selected conversation messages
    // ========================================
    if (selectedConversation) {
      const updated =
        data.find(
          (item) =>
            item.documentId ===
            selectedConversation.documentId ||
            item.id ===
            selectedConversation.id
        );

      await loadMessages(
        updated || selectedConversation
      );
    }
  };

  // ==========================================
  // Create Conversation
  // ==========================================
  const handleCreateConversation =
    async ({ subject, message }) => {
      if (!user) {
        return;
      }

      try {
        setLoading(true);

        const result =
          await createConversation({
            subject,
            message,
            user,
          });

        const newConversation =
          result.conversation;

        setModalOpen(false);

        toast.success(
          "تم إنشاء المحادثة بنجاح"
        );

        // ======================================
        // Reload conversations
        // ======================================
        await loadConversations(user);

        // ======================================
        // Select new conversation
        // ======================================
        setSelectedConversation(
          newConversation
        );

        // ======================================
        // Show first message
        // ======================================
        if (result.message) {
          setMessages([
            result.message,
          ]);
        } else {
          await loadMessages(
            newConversation
          );
        }
      } catch (error) {
        console.error(
          "CREATE CONVERSATION ERROR:",
          error.response?.data || error
        );

        toast.error(
          error.response?.data?.error
            ?.message ||
          error.message ||
          "تعذر إنشاء المحادثة"
        );
      } finally {
        setLoading(false);
      }
    };

  // ==========================================
  // Send Customer Message
  // ==========================================
  const handleSendMessage =
    async (text) => {
      if (!selectedConversation) {
        return;
      }

      try {
        setMessagesLoading(true);

        const newMessage =
          await sendMessage({
            conversation:
              selectedConversation,
            message: text,
          });

        if (newMessage) {
          setMessages(
            (previousMessages) => [
              ...previousMessages,
              newMessage,
            ]
          );
        }

        await loadConversations(user);
      } catch (error) {
        console.error(
          "SEND MESSAGE ERROR:",
          error.response?.data || error
        );

        toast.error(
          error.response?.data?.error
            ?.message ||
          error.message ||
          "تعذر إرسال الرسالة"
        );
      } finally {
        setMessagesLoading(false);
      }
    };

  // ==========================================
  // Close Conversation
  // ==========================================
  const handleCloseConversation =
    async () => {
      if (!selectedConversation) {
        return;
      }

      try {
        setLoading(true);

        const updated =
          await closeConversation(
            selectedConversation
          );

        setSelectedConversation(
          updated
        );

        toast.success(
          "تم إغلاق المحادثة"
        );

        await loadConversations(user);

        await loadMessages(
          updated
        );
      } catch (error) {
        console.error(
          "CLOSE CONVERSATION ERROR:",
          error.response?.data || error
        );

        toast.error(
          error.response?.data?.error
            ?.message ||
          error.message ||
          "تعذر إغلاق المحادثة"
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
      className="min-h-screen bg-[#0e0e0e] text-white"
    >
      <Navbar />

      <main className="mx-auto mt-14 w-full max-w-[1600px] px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8">
        <SupportHeader
          onRefresh={handleRefresh}
          onNewConversation={() =>
            setModalOpen(true)
          }
          loading={
            loading || messagesLoading
          }
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
          <ConversationList
            conversations={conversations}
            selectedConversation={
              selectedConversation
            }
            onSelect={
              handleSelectConversation
            }
          />

          <ChatWindow
            conversation={
              selectedConversation
            }
            messages={messages}
            onSendMessage={
              handleSendMessage
            }
            onCloseConversation={
              handleCloseConversation
            }
            onNewConversation={() =>
              setModalOpen(true)
            }
            loading={
              loading || messagesLoading
            }
          />
        </div>
      </main>

      <NewConversationModal
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onSubmit={
          handleCreateConversation
        }
        loading={loading}
      />
    </div>
  );
}

