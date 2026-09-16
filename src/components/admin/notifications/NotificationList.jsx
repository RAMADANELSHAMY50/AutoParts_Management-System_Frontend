import React from "react";
import NotificationCard from "./NotificationCard";
import EmptyState from "./EmptyState";

export default function NotificationList({
  notifications = [],
  activeTab = "all",
  search = "",
  loading = false,
}) {

  // ==========================================
  // Loading
  // ==========================================
  if (loading) {
    return (
      <div
        dir="rtl"
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          text-gray-400
        "
      >
        جاري تحميل الإشعارات...
      </div>
    );
  }

  // ==========================================
  // Filter
  // ==========================================
  const filteredNotifications =
    notifications
      .filter((item) => {

        const notification =
          item.attributes || item;

        // Category
        const matchesCategory =
          activeTab === "all" ||
          notification.category === activeTab;

        // Search
        const searchText =
          search.toLowerCase().trim();

        const title =
          notification.title
            ?.toLowerCase() || "";

        const message =
          notification.message
            ?.toLowerCase() || "";

        const type =
          notification.type
            ?.toLowerCase() || "";

        const matchesSearch =
          !searchText ||
          title.includes(searchText) ||
          message.includes(searchText) ||
          type.includes(searchText);

        return (
          matchesCategory &&
          matchesSearch
        );
      })
      // ========================================
      // Newest First
      // ========================================
      .sort((a, b) => {
        const notificationA =
          a.attributes || a;

        const notificationB =
          b.attributes || b;

        return (
          new Date(
            notificationB.createdAt
          ) -
          new Date(
            notificationA.createdAt
          )
        );
      });

  // ==========================================
  // Empty
  // ==========================================
  if (filteredNotifications.length === 0) {
    return (
      <EmptyState
        title="لا توجد إشعارات"
        description={
          search
            ? "لا توجد إشعارات مطابقة لعملية البحث."
            : activeTab !== "all"
            ? "لا توجد إشعارات في هذا التصنيف."
            : "لا توجد إشعارات في الوقت الحالي."
        }
      />
    );
  }

  // ==========================================
  // List
  // ==========================================
  return (
    <div className="space-y-4">

      {filteredNotifications.map(
        (item) => {

          const notification =
            item.attributes || item;

          return (
            <NotificationCard
              key={
                item.documentId ||
                item.id
              }
              notification={
                notification
              }
            />
          );
        }
      )}

    </div>
  );
}