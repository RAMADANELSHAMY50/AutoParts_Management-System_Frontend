import React from "react";
import NotificationCard from "./NotificationCard";
import EmptyState from "./EmptyState";

export default function NotificationList({
  notifications = [],
  activeTab = "all",
  search = "",
  loading = false,
}) {
  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        جاري تحميل الإشعارات...
      </div>
    );
  }

  const filteredNotifications = notifications.filter((item) => {
    const notification = item.attributes || item;

    const matchesCategory =
      activeTab === "all" ||
      notification.category === activeTab;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      !searchText ||
      notification.title?.toLowerCase().includes(searchText) ||
      notification.message?.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  if (filteredNotifications.length === 0) {
    return (
      <EmptyState
        title="لا توجد إشعارات"
        description="لا توجد إشعارات مطابقة للبحث أو التصنيف المحدد."
      />
    );
  }

  return (
    <div className="space-y-5">
      {filteredNotifications.map((item) => {
        const notification = item.attributes || item;

        return (
          <NotificationCard
            key={item.id}
            notification={notification}
          />
        );
      })}
    </div>
  );
}