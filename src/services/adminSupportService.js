
import axios from "axios";

const API_URL = "http://localhost:1337";

// ==========================================
// Config
// ==========================================
const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

// ==========================================
// Get All Conversations
// ==========================================
export const getAdminConversations = async () => {
  const response = await axios.get(
    `${API_URL}/api/support-conversations`,
    {
      ...getConfig(),
      params: {
        populate: "users_permissions_user",
        sort: "updatedAt:desc",
        "pagination[limit]": 100,
      },
    }
  );

  return response.data?.data || [];
};

// ==========================================
// Get Messages
// ==========================================
export const getAdminMessages = async (conversation) => {
  if (!conversation) {
    return [];
  }

  const params = {
    populate: "*",
    sort: "createdAt:asc",
    "pagination[limit]": 100,
  };

  // ==========================================
  // Strapi v5
  // ==========================================
  if (conversation.documentId) {
    params[
      "filters[support_conversation][documentId][$eq]"
    ] = conversation.documentId;
  } else {
    params[
      "filters[support_conversation][id][$eq]"
    ] = conversation.id;
  }

  console.log(
    "ADMIN GET MESSAGES PARAMS:",
    params
  );

  const response = await axios.get(
    `${API_URL}/api/support-messages`,
    {
      ...getConfig(),
      params,
    }
  );

  const messages = response.data?.data || [];

  console.log(
    "ADMIN CONVERSATION MESSAGES:",
    messages
  );

  return messages;
};

// ==========================================
// Send Admin Reply
// ==========================================
export const sendAdminMessage = async ({
  conversation,
  message,
}) => {
  if (!conversation) {
    throw new Error("المحادثة غير موجودة");
  }

  if (!message?.trim()) {
    throw new Error("اكتب رسالة أولاً");
  }

  if (conversation.status1 === "مغلقة") {
    throw new Error(
      "لا يمكن الرد على محادثة مغلقة"
    );
  }

  const conversationId =
    conversation.documentId || conversation.id;

  // ==========================================
  // Create Message
  // ==========================================
  const payload = {
    data: {
      message: message.trim(),
      sender: "دعم",
      support_conversation: conversationId,
    },
  };

  console.log(
    "ADMIN SEND MESSAGE PAYLOAD:",
    payload
  );

  const response = await axios.post(
    `${API_URL}/api/support-messages`,
    payload,
    getConfig()
  );

  const createdMessage =
    response.data?.data;

  console.log(
    "ADMIN MESSAGE CREATED:",
    createdMessage
  );

  if (!createdMessage) {
    throw new Error(
      "تم إنشاء الرسالة لكن لم يتم إرجاع بياناتها"
    );
  }

  // ==========================================
  // Publish Message
  // ==========================================
  const messageDocumentId =
    createdMessage.documentId;

  if (!messageDocumentId) {
    console.warn(
      "⚠️ Message documentId not found. Message may remain draft."
    );

    return createdMessage;
  }

  try {
    console.log(
      "📢 PUBLISHING ADMIN MESSAGE:",
      messageDocumentId
    );

    const publishResponse = await axios.put(
      `${API_URL}/api/support-messages/${messageDocumentId}`,
      {
        data: {},
      },
      {
        ...getConfig(),
        params: {
          status: "published",
        },
      }
    );

    const publishedMessage =
      publishResponse.data?.data;

    console.log(
      "✅ ADMIN MESSAGE PUBLISHED:",
      publishedMessage
    );

    return publishedMessage || createdMessage;
  } catch (publishError) {
    console.error(
      "❌ ADMIN MESSAGE PUBLISH FAILED"
    );

    console.error(
      "STATUS:",
      publishError.response?.status
    );

    console.error(
      "RESPONSE:",
      publishError.response?.data
    );

    // Return the created message so the UI
    // does not break even if publishing fails.
    return createdMessage;
  }
};

// ==========================================
// Close Conversation
// ==========================================
export const closeAdminConversation = async (
  conversation
) => {
  if (!conversation) {
    throw new Error("المحادثة غير موجودة");
  }

  const conversationId =
    conversation.documentId || conversation.id;

  const response = await axios.put(
    `${API_URL}/api/support-conversations/${conversationId}`,
    {
      data: {
        status1: "مغلقة",
      },
    },
    getConfig()
  );

  return response.data?.data;
};

// ==========================================
// Reopen Conversation
// ==========================================
export const reopenAdminConversation = async (
  conversation
) => {
  if (!conversation) {
    throw new Error("المحادثة غير موجودة");
  }

  const conversationId =
    conversation.documentId || conversation.id;

  const response = await axios.put(
    `${API_URL}/api/support-conversations/${conversationId}`,
    {
      data: {
        status1: "مفتوحة",
      },
    },
    getConfig()
  );

  return response.data?.data;
};

