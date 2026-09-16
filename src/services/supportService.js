
import axios from "axios";

const API_URL = "http://localhost:1337";

// ==========================================
// Axios Config
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
// Get Current User
// ==========================================
export const getCurrentUser = async () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch {
      console.warn("Invalid stored user");
    }
  }

  const response = await axios.get(
    `${API_URL}/api/users/me`,
    getConfig()
  );

  return response.data;
};

// ==========================================
// Get Customer Conversations
// ==========================================
export const getConversations = async (user) => {
  if (!user?.id) {
    return [];
  }

  const response = await axios.get(
    `${API_URL}/api/support-conversations`,
    {
      ...getConfig(),

      params: {
        populate: "support_messages",

        sort: "updatedAt:desc",

        "filters[users_permissions_user][id][$eq]":
          user.id,

        "pagination[limit]": 100,

        // Get published conversations
        status: "published",
      },
    }
  );

  const conversations =
    response.data?.data || [];

  console.log(
    "CUSTOMER CONVERSATIONS:",
    conversations
  );

  return conversations;
};

// ==========================================
// Get Messages
// ==========================================
export const getMessages = async (
  conversation
) => {
  if (!conversation) {
    return [];
  }

  const params = {
    populate: "*",

    sort: "createdAt:asc",

    "pagination[limit]": 100,

    // Only published messages
    status: "published",
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
    "CUSTOMER GET MESSAGES PARAMS:",
    params
  );

  try {
    const response = await axios.get(
      `${API_URL}/api/support-messages`,
      {
        ...getConfig(),
        params,
      }
    );

    const messages =
      response.data?.data || [];

    console.log(
      "CUSTOMER SUPPORT MESSAGES:",
      messages
    );

    return messages;
  } catch (error) {
    console.error(
      "CUSTOMER GET MESSAGES ERROR:",
      error.response?.data || error
    );

    throw error;
  }
};

// ==========================================
// Create Conversation
// ==========================================
export const createConversation = async ({
  subject,
  message,
  user,
}) => {
  if (!user?.id) {
    throw new Error(
      "المستخدم غير مسجل الدخول"
    );
  }

  if (!subject?.trim()) {
    throw new Error(
      "من فضلك اكتب موضوع المشكلة"
    );
  }

  if (!message?.trim()) {
    throw new Error(
      "من فضلك اكتب الرسالة"
    );
  }

  // ========================================
  // Create Conversation
  // ========================================
  const conversationPayload = {
    data: {
      subject: subject.trim(),

      // Strapi enum:
      // مفتوحة / مغلقة
      status1: "مفتوحة",

      users_permissions_user:
        user.documentId || user.id,
    },
  };

  console.log(
    "CREATE CONVERSATION PAYLOAD:",
    conversationPayload
  );

  const conversationResponse =
    await axios.post(
      `${API_URL}/api/support-conversations`,
      conversationPayload,
      getConfig()
    );

  const conversation =
    conversationResponse.data?.data;

  if (!conversation) {
    throw new Error(
      "فشل إنشاء المحادثة"
    );
  }

  console.log(
    "CONVERSATION CREATED:",
    conversation
  );

  // ========================================
  // Create First Message
  // ========================================
  const messagePayload = {
    data: {
      message: message.trim(),

      // Strapi enum:
      // عميل / دعم
      sender: "عميل",

      support_conversation:
        conversation.documentId ||
        conversation.id,
    },
  };

  console.log(
    "CREATE FIRST MESSAGE PAYLOAD:",
    messagePayload
  );

  const messageResponse =
    await axios.post(
      `${API_URL}/api/support-messages`,
      messagePayload,
      getConfig()
    );

  const createdMessage =
    messageResponse.data?.data;

  console.log(
    "FIRST MESSAGE CREATED:",
    createdMessage
  );

  return {
    conversation,
    message: createdMessage,
  };
};

// ==========================================
// Send Customer Message
// ==========================================
export const sendMessage = async ({
  conversation,
  message,
}) => {
  if (!conversation) {
    throw new Error(
      "المحادثة غير موجودة"
    );
  }

  if (!message?.trim()) {
    throw new Error(
      "اكتب رسالة أولاً"
    );
  }

  if (conversation.status1 === "مغلقة") {
    throw new Error(
      "لا يمكن إرسال رسالة في محادثة مغلقة"
    );
  }

  const conversationId =
    conversation.documentId ||
    conversation.id;

  const payload = {
    data: {
      message: message.trim(),

      sender: "عميل",

      support_conversation:
        conversationId,
    },
  };

  console.log(
    "SEND MESSAGE PAYLOAD:",
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
    "CUSTOMER MESSAGE CREATED:",
    createdMessage
  );

  return createdMessage;
};

// ==========================================
// Close Conversation
// ==========================================
export const closeConversation = async (
  conversation
) => {
  if (!conversation) {
    throw new Error(
      "المحادثة غير موجودة"
    );
  }

  const conversationId =
    conversation.documentId ||
    conversation.id;

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
