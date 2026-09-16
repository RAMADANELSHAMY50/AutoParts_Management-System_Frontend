import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  FiBell,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiInfo,
  FiPackage,
  FiRefreshCw,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import Navbar from "../../components/customer/layout/Navbar";

const API_URL = "http://localhost:1337";

export default function NotificationCustomer() {
  // =========================================================
  // State
  // =========================================================

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [currentUser, setCurrentUser] =
    useState(null);

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [selectedNotification, setSelectedNotification] =
    useState(null);

  // =========================================================
  // Helpers
  // =========================================================

  const getNotificationData = (
    notification
  ) => {
    return (
      notification?.attributes ||
      notification ||
      {}
    );
  };

  const isNotificationRead = (
    notification
  ) => {
    const data =
      getNotificationData(notification);

    return data?.isRead === true;
  };

  // =========================================================
  // Get Current User
  // =========================================================

  const getCurrentUser = async () => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser);

          if (
            parsedUser &&
            (parsedUser.id ||
              parsedUser.documentId)
          ) {
            console.log(
              "CURRENT USER FROM LOCAL STORAGE:",
              parsedUser
            );

            setCurrentUser(parsedUser);

            return parsedUser;
          }
        } catch (parseError) {
          console.error(
            "INVALID STORED USER:",
            parseError
          );
        }
      }

      const token =
        localStorage.getItem("token");

      if (!token) {
        console.log("NO TOKEN FOUND");

        setCurrentUser(null);

        return null;
      }

      const response = await axios.get(
        `${API_URL}/api/users/me?populate=avatar`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = response.data;

      if (user) {
        console.log(
          "CURRENT USER FROM API:",
          user
        );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        setCurrentUser(user);

        return user;
      }

      return null;
    } catch (error) {
      console.error(
        "GET CURRENT USER ERROR:",
        error.response?.data ||
          error.message
      );

      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        try {
          const parsedUser =
            JSON.parse(storedUser);

          if (
            parsedUser &&
            (parsedUser.id ||
              parsedUser.documentId)
          ) {
            console.log(
              "USING SAVED USER AFTER API ERROR:",
              parsedUser
            );

            setCurrentUser(parsedUser);

            return parsedUser;
          }
        } catch (parseError) {
          console.error(
            "INVALID SAVED USER:",
            parseError
          );
        }
      }

      setCurrentUser(null);

      return null;
    }
  };

  // =========================================================
  // Get Users Relation
  // =========================================================

  const getNotificationUsers = (
    notification
  ) => {
    const data =
      notification?.attributes ||
      notification ||
      {};

    const relation =
      data?.users_permissions_users;

    if (!relation) {
      return [];
    }

    if (Array.isArray(relation?.data)) {
      return relation.data;
    }

    if (Array.isArray(relation)) {
      return relation;
    }

    if (
      relation &&
      typeof relation === "object" &&
      (relation.id ||
        relation.documentId)
    ) {
      return [relation];
    }

    return [];
  };

  // =========================================================
  // Check Notification Belongs To User
  // =========================================================

  const notificationBelongsToUser = (
    notification,
    user
  ) => {
    if (!notification || !user) {
      return false;
    }

    const currentUserId = String(
      user.id || ""
    );

    const currentUserDocumentId =
      String(user.documentId || "");

    const users =
      getNotificationUsers(
        notification
      );

    return users.some(
      (notificationUser) => {
        const userData =
          notificationUser?.attributes ||
          notificationUser ||
          {};

        const notificationUserId =
          String(
            userData?.id || ""
          );

        const notificationUserDocumentId =
          String(
            userData?.documentId || ""
          );

        return (
          (currentUserId &&
            notificationUserId &&
            currentUserId ===
              notificationUserId) ||
          (currentUserDocumentId &&
            notificationUserDocumentId &&
            currentUserDocumentId ===
              notificationUserDocumentId)
        );
      }
    );
  };

  // =========================================================
  // Fetch Notifications
  // =========================================================

  const fetchNotifications = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const user =
        await getCurrentUser();

      if (!user) {
        console.log(
          "NO CURRENT USER"
        );

        setNotifications([]);

        return;
      }

      console.log(
        "CURRENT CUSTOMER:",
        user
      );

      const token =
        localStorage.getItem("token");

      if (!token) {
        console.log("NO TOKEN");

        setNotifications([]);

        return;
      }

      const response =
        await axios.get(
          `${API_URL}/api/notifications`,
          {
            params: {
              populate:
                "users_permissions_users",

              sort: "createdAt:desc",

              "pagination[limit]": 100,
            },

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const allNotifications =
        response.data?.data || [];

      console.log(
        "ALL NOTIFICATIONS:",
        allNotifications
      );

      const customerNotifications =
        allNotifications.filter(
          (notification) =>
            notificationBelongsToUser(
              notification,
              user
            )
        );

      console.log(
        "CURRENT CUSTOMER NOTIFICATIONS:",
        customerNotifications
      );

      setNotifications(
        customerNotifications
      );
    } catch (error) {
      console.error(
        "FETCH NOTIFICATIONS ERROR:",
        error.response?.data ||
          error.message
      );

      if (
        error.response?.status === 401
      ) {
        console.error(
          "TOKEN EXPIRED OR INVALID"
        );
      }

      setNotifications([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================================================
  // Notify Navbar
  // =========================================================

  const notifyNavbar = () => {
    window.dispatchEvent(
      new Event(
        "notificationsUpdated"
      )
    );
  };

  // =========================================================
  // Mark As Read
  // =========================================================

  const markAsRead = async (
    notification
  ) => {
    if (!notification) {
      return;
    }

    if (
      isNotificationRead(
        notification
      )
    ) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      const notificationId =
        notification.documentId ||
        notification.id;

      if (!notificationId) {
        console.error(
          "NOTIFICATION ID NOT FOUND"
        );

        return;
      }

      await axios.put(
        `${API_URL}/api/notifications/${notificationId}`,
        {
          data: {
            isRead: true,
          },
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setNotifications(
        (previous) =>
          previous.map((item) => {
            const itemId =
              item.documentId ||
              item.id;

            if (
              String(itemId) ===
              String(notificationId)
            ) {
              if (item?.attributes) {
                return {
                  ...item,
                  attributes: {
                    ...item.attributes,
                    isRead: true,
                  },
                };
              }

              return {
                ...item,
                isRead: true,
              };
            }

            return item;
          })
      );

      if (
        selectedNotification &&
        String(
          selectedNotification.documentId ||
            selectedNotification.id
        ) ===
          String(notificationId)
      ) {
        setSelectedNotification(
          (previous) => {
            if (!previous) {
              return null;
            }

            if (previous?.attributes) {
              return {
                ...previous,
                attributes: {
                  ...previous.attributes,
                  isRead: true,
                },
              };
            }

            return {
              ...previous,
              isRead: true,
            };
          }
        );
      }

      notifyNavbar();
    } catch (error) {
      console.error(
        "MARK NOTIFICATION AS READ ERROR:",
        error.response?.data ||
          error.message
      );
    }
  };

  // =========================================================
  // Mark All As Read
  // =========================================================

  const markAllAsRead = async () => {
    const unreadNotifications =
      notifications.filter(
        (notification) =>
          !isNotificationRead(
            notification
          )
      );

    if (
      unreadNotifications.length === 0
    ) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      await Promise.all(
        unreadNotifications.map(
          async (notification) => {
            const notificationId =
              notification.documentId ||
              notification.id;

            if (!notificationId) {
              return;
            }

            await axios.put(
              `${API_URL}/api/notifications/${notificationId}`,
              {
                data: {
                  isRead: true,
                },
              },
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );
          }
        )
      );

      setNotifications(
        (previous) =>
          previous.map(
            (notification) => {
              if (
                notification?.attributes
              ) {
                return {
                  ...notification,
                  attributes: {
                    ...notification.attributes,
                    isRead: true,
                  },
                };
              }

              return {
                ...notification,
                isRead: true,
              };
            }
          )
      );

      setSelectedNotification(
        (previous) => {
          if (!previous) {
            return null;
          }

          if (previous?.attributes) {
            return {
              ...previous,
              attributes: {
                ...previous.attributes,
                isRead: true,
              },
            };
          }

          return {
            ...previous,
            isRead: true,
          };
        }
      );

      notifyNavbar();
    } catch (error) {
      console.error(
        "MARK ALL AS READ ERROR:",
        error.response?.data ||
          error.message
      );
    }
  };

  // =========================================================
  // Delete Notification
  // =========================================================

  const deleteNotification = async (
    notification
  ) => {
    if (!notification) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        return;
      }

      const notificationId =
        notification.documentId ||
        notification.id;

      if (!notificationId) {
        return;
      }

      await axios.delete(
        `${API_URL}/api/notifications/${notificationId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setNotifications(
        (previous) =>
          previous.filter((item) => {
            const itemId =
              item.documentId ||
              item.id;

            return (
              String(itemId) !==
              String(notificationId)
            );
          })
      );

      if (
        selectedNotification &&
        String(
          selectedNotification.documentId ||
            selectedNotification.id
        ) ===
          String(notificationId)
      ) {
        setSelectedNotification(null);
      }

      notifyNavbar();
    } catch (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error.response?.data ||
          error.message
      );
    }
  };

  // =========================================================
  // Open Notification
  // =========================================================

  const openNotification = async (
    notification
  ) => {
    setSelectedNotification(
      notification
    );

    if (
      !isNotificationRead(
        notification
      )
    ) {
      await markAsRead(
        notification
      );
    }
  };

  // =========================================================
  // Notification Icon
  // =========================================================

  const getNotificationIcon = (
    notification
  ) => {
    const data =
      getNotificationData(
        notification
      );

    const type =
      data?.type || "";

    const title =
      data?.title || "";

    if (
      type ===
        "تم إنشاء الفاتورة" ||
      title.includes("طلب") ||
      title.includes("فاتورة")
    ) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
          <FiFileText className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </div>
      );
    }

    if (
      type === "مخزون منخفض" ||
      title.includes("مخزون")
    ) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
          <FiPackage className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </div>
      );
    }

    if (
      type === "عرض جديد" ||
      title.includes("عرض")
    ) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
          <FiInfo className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </div>
      );
    }

    if (
      type === "عميل جديد" ||
      title.includes("عميل")
    ) {
      return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-400 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
          <FiCheckCircle className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
        </div>
      );
    }

    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-700/30 text-zinc-300 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
        <FiBell className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
      </div>
    );
  };

  // =========================================================
  // Format Date
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "";
    }

    return parsedDate.toLocaleString(
      "ar-EG",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // Filters
  // =========================================================

  const filteredNotifications =
    useMemo(() => {
      if (
        activeFilter === "unread"
      ) {
        return notifications.filter(
          (notification) =>
            !isNotificationRead(
              notification
            )
        );
      }

      if (
        activeFilter === "read"
      ) {
        return notifications.filter(
          (notification) =>
            isNotificationRead(
              notification
            )
        );
      }

      return notifications;
    }, [
      notifications,
      activeFilter,
    ]);

  // =========================================================
  // Counts
  // =========================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !isNotificationRead(
          notification
        )
    ).length;

  const readCount =
    notifications.filter(
      (notification) =>
        isNotificationRead(
          notification
        )
    ).length;

  // =========================================================
  // Initial Load
  // =========================================================

  useEffect(() => {
    fetchNotifications();

    const handleNotificationsUpdated =
      () => {
        console.log(
          "🔔 NOTIFICATIONS UPDATED EVENT"
        );

        fetchNotifications(true);
      };

    window.addEventListener(
      "notificationsUpdated",
      handleNotificationsUpdated
    );

    const handleStorage = (
      event
    ) => {
      if (
        event.key === "user" ||
        event.key === "token"
      ) {
        fetchNotifications(true);
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        handleNotificationsUpdated
      );

      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // =========================================================
  // UI
  // =========================================================

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#111111] text-white"
    >
      {/* CUSTOMER NAVBAR */}
      <Navbar />

      {/* Notification Header */}
      <div className="mt-16 border-b border-zinc-800 bg-[#151515]">
        <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <FiBell className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0">
                  <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                    الإشعارات
                  </h1>

                  <p className="mt-1 text-xs leading-5 text-zinc-400 sm:text-sm">
                    تابع آخر التحديثات والطلبات الخاصة بحسابك
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-start lg:w-auto">
              <button
                type="button"
                onClick={() =>
                  fetchNotifications(true)
                }
                disabled={refreshing}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#1b1b1b] px-3 py-2.5 text-xs text-zinc-300 transition hover:border-blue-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-4 sm:text-sm"
              >
                <FiRefreshCw
                  className={`h-4 w-4 ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                تحديث
              </button>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={
                    markAllAsRead
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-blue-700 sm:w-auto sm:px-4 sm:text-sm"
                >
                  <FiCheck className="h-4 w-4" />

                  تحديد الكل كمقروء
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">

        {/* Stats */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">

          {/* Total */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 sm:text-sm">
                  إجمالي الإشعارات
                </p>

                <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                  {notifications.length}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 sm:h-11 sm:w-11">
                <FiBell className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Unread */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 sm:text-sm">
                  غير مقروءة
                </p>

                <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                  {unreadCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 sm:h-11 sm:w-11">
                <FiClock className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Read */}
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 sm:text-sm">
                  مقروءة
                </p>

                <p className="mt-1.5 text-2xl font-bold text-white sm:mt-2 sm:text-3xl">
                  {readCount}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400 sm:h-11 sm:w-11">
                <FiCheckCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6">

          <button
            type="button"
            onClick={() =>
              setActiveFilter("all")
            }
            className={`rounded-xl px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
              activeFilter === "all"
                ? "bg-blue-600 text-white"
                : "border border-zinc-800 bg-[#171717] text-zinc-400 hover:text-white"
            }`}
          >
            الكل

            <span className="mr-1.5 sm:mr-2">
              ({notifications.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveFilter(
                "unread"
              )
            }
            className={`rounded-xl px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
              activeFilter === "unread"
                ? "bg-blue-600 text-white"
                : "border border-zinc-800 bg-[#171717] text-zinc-400 hover:text-white"
            }`}
          >
            غير مقروءة

            <span className="mr-1.5 sm:mr-2">
              ({unreadCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveFilter(
                "read"
              )
            }
            className={`rounded-xl px-3 py-2 text-xs transition sm:px-4 sm:text-sm ${
              activeFilter === "read"
                ? "bg-blue-600 text-white"
                : "border border-zinc-800 bg-[#171717] text-zinc-400 hover:text-white"
            }`}
          >
            مقروءة

            <span className="mr-1.5 sm:mr-2">
              ({readCount})
            </span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-8 text-center sm:p-12">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500 sm:h-10 sm:w-10" />

            <p className="text-xs text-zinc-400 sm:text-sm">
              جاري تحميل الإشعارات...
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          filteredNotifications.length ===
            0 && (
            <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-8 text-center sm:p-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500 sm:mb-5 sm:h-16 sm:w-16">
                <FiBell className="h-7 w-7 sm:h-[30px] sm:w-[30px]" />
              </div>

              <h2 className="text-lg font-semibold text-white sm:text-xl">
                لا توجد إشعارات
              </h2>

              <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-zinc-500 sm:text-sm">
                لا توجد إشعارات جديدة لعرضها حاليًا.
              </p>
            </div>
          )}

        {/* Notifications List */}
        {!loading &&
          filteredNotifications.length >
            0 && (
            <div className="space-y-3 sm:space-y-4">
              {filteredNotifications.map(
                (notification) => {
                  const notificationData =
                    getNotificationData(
                      notification
                    );

                  const notificationId =
                    notification.documentId ||
                    notification.id;

                  const notificationIsRead =
                    isNotificationRead(
                      notification
                    );

                  return (
                    <div
                      key={
                        notificationId
                      }
                      className={`group rounded-2xl border p-3 transition sm:p-4 lg:p-5 ${
                        notificationIsRead
                          ? "border-zinc-800 bg-[#171717]"
                          : "border-blue-500/30 bg-blue-500/[0.04]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5 sm:gap-4">

                        {/* Icon */}
                        {getNotificationIcon(
                          notification
                        )}

                        {/* Content */}
                        <div className="min-w-0 flex-1">

                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">

                                <h3 className="break-words text-sm font-semibold text-white sm:text-base">
                                  {notificationData.title ||
                                    "إشعار"}
                                </h3>

                                {!notificationIsRead && (
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 sm:h-2 sm:w-2" />
                                )}
                              </div>

                              <p className="mt-1.5 break-words text-xs leading-6 text-zinc-400 sm:mt-2 sm:text-sm sm:leading-7">
                                {notificationData.message ||
                                  "لا توجد تفاصيل لهذا الإشعار"}
                              </p>
                            </div>

                            <span className="max-w-full shrink-0 break-words text-[10px] leading-5 text-zinc-500 sm:max-w-xs sm:text-xs">
                              {formatDate(
                                notificationData.createdAt ||
                                  notificationData.createdat
                              )}
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:mt-4 sm:gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                openNotification(
                                  notification
                                )
                              }
                              className="rounded-lg border border-zinc-700 px-2.5 py-1.5 text-[10px] text-zinc-300 transition hover:border-blue-500 hover:text-white sm:px-3 sm:py-2 sm:text-xs"
                            >
                              عرض التفاصيل
                            </button>

                            {!notificationIsRead && (
                              <button
                                type="button"
                                onClick={() =>
                                  markAsRead(
                                    notification
                                  )
                                }
                                className="flex items-center gap-1 rounded-lg border border-green-500/30 px-2.5 py-1.5 text-[10px] text-green-400 transition hover:bg-green-500/10 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                              >
                                <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                                تحديد كمقروء
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                deleteNotification(
                                  notification
                                )
                              }
                              className="flex items-center gap-1 rounded-lg border border-red-500/20 px-2.5 py-1.5 text-[10px] text-red-400 transition hover:bg-red-500/10 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-xs"
                            >
                              <FiTrash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                              حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
      </main>

      {/* Notification Details Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:p-4"
          onClick={() =>
            setSelectedNotification(
              null
            )
          }
        >
          <div
            className="my-auto w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#181818] shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800 p-3 sm:p-5">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                {getNotificationIcon(
                  selectedNotification
                )}

                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white sm:text-base">
                    تفاصيل الإشعار
                  </h2>

                  <p className="mt-1 break-words text-[10px] text-zinc-500 sm:text-xs">
                    {formatDate(
                      getNotificationData(
                        selectedNotification
                      ).createdAt ||
                        getNotificationData(
                          selectedNotification
                        ).createdat
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
                className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white sm:p-2"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">

              {/* Title */}
              <div>
                <p className="mb-1.5 text-[10px] text-zinc-500 sm:mb-2 sm:text-xs">
                  العنوان
                </p>

                <h3 className="break-words text-base font-semibold text-white sm:text-lg">
                  {
                    getNotificationData(
                      selectedNotification
                    ).title ||
                      "إشعار"
                  }
                </h3>
              </div>

              {/* Message */}
              <div>
                <p className="mb-1.5 text-[10px] text-zinc-500 sm:mb-2 sm:text-xs">
                  الرسالة
                </p>

                <div className="break-words rounded-xl border border-zinc-800 bg-[#111111] p-3 text-xs leading-6 text-zinc-300 sm:p-4 sm:text-sm sm:leading-7">
                  {
                    getNotificationData(
                      selectedNotification
                    ).message ||
                      "لا توجد تفاصيل لهذا الإشعار"
                  }
                </div>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">

                <div className="rounded-xl border border-zinc-800 bg-[#111111] p-3 sm:p-4">
                  <p className="text-[10px] text-zinc-500 sm:text-xs">
                    الحالة
                  </p>

                  <p className="mt-1.5 text-xs font-medium text-white sm:mt-2 sm:text-sm">
                    {isNotificationRead(
                      selectedNotification
                    )
                      ? "مقروء"
                      : "غير مقروء"}
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-[#111111] p-3 sm:p-4">
                  <p className="text-[10px] text-zinc-500 sm:text-xs">
                    النوع
                  </p>

                  <p className="mt-1.5 break-words text-xs font-medium text-white sm:mt-2 sm:text-sm">
                    {
                      getNotificationData(
                        selectedNotification
                      ).type ||
                        "النظام"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 border-t border-zinc-800 p-3 sm:gap-3 sm:p-5">
              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(
                    null
                  )
                }
                className="rounded-xl border border-zinc-700 px-4 py-2 text-xs text-zinc-300 transition hover:bg-zinc-800 hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}