import React from "react";

import NotificationCard from "./NotificationCard";
import EmptyState from "./EmptyState";

export default function NotificationList({
  notifications = [],
  activeTab = "all",
  search = "",
  loading = false,
  onMarkAsRead,
}) {
  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[240px] items-center justify-center px-4 text-center text-sm text-gray-400 sm:min-h-[300px]"
      >
        جاري تحميل الإشعارات...
      </div>
    );
  }

  const searchText = search.toLowerCase().trim();

  const filteredNotifications = notifications
    .filter((notification) => {
      // ============================
      // Read / Unread
      // ============================
      if (
        activeTab === "unread" &&
        notification?.isRead !== false
      ) {
        return false;
      }

      // ============================
      // Search
      // ============================
      const title =
        notification?.title?.toLowerCase() || "";

      const message =
        notification?.message?.toLowerCase() || "";

      const type =
        notification?.type?.toLowerCase() || "";

      return (
        !searchText ||
        title.includes(searchText) ||
        message.includes(searchText) ||
        type.includes(searchText)
      );
    })
    .sort((a, b) => {
      return (
        new Date(
          b?.createdAt || b?.createdat || 0
        ) -
        new Date(
          a?.createdAt || a?.createdat || 0
        )
      );
    });

  if (filteredNotifications.length === 0) {
    return (
      <EmptyState
        title="لا توجد إشعارات"
        description={
          search
            ? "لا توجد إشعارات مطابقة لعملية البحث."
            : activeTab === "unread"
            ? "لا توجد إشعارات غير مقروءة."
            : "لا توجد إشعارات في الوقت الحالي."
        }
      />
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {filteredNotifications.map((notification) => (
        <NotificationCard
          key={
            notification?.documentId ||
            notification?.id
          }
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
}