import React from "react";

import {
  FiPackage,
  FiTag,
  FiAlertTriangle,
  FiUserPlus,
  FiFileText,
  FiSettings,
  FiInfo,
  FiClock,
  FiCheck,
} from "react-icons/fi";

const getNotificationStyle = (notification) => {
  const title = notification?.title || "";
  const type = notification?.type || "";

  if (
    type === "مخزون منخفض" ||
    title.includes("مخزون") ||
    title.includes("منخفض")
  ) {
    return {
      icon: FiAlertTriangle,
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      badge: "مخزون",
      badgeClass: "bg-yellow-500/10 text-yellow-400",
    };
  }

  if (
    type === "عرض جديد" ||
    title.includes("عرض")
  ) {
    return {
      icon: FiTag,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      badge: "عرض جديد",
      badgeClass: "bg-blue-500/10 text-blue-400",
    };
  }

  if (
    type === "عميل جديد" ||
    title.includes("عميل")
  ) {
    return {
      icon: FiUserPlus,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      badge: "عميل",
      badgeClass: "bg-green-500/10 text-green-400",
    };
  }

  if (
    type === "تم إنشاء الفاتورة" ||
    title.includes("فاتورة") ||
    title.includes("طلب")
  ) {
    return {
      icon: FiFileText,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      badge: "طلب",
      badgeClass: "bg-purple-500/10 text-purple-400",
    };
  }

  if (
    title.includes("منتج") ||
    title.includes("إضافة") ||
    title.includes("تعديل")
  ) {
    return {
      icon: FiPackage,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      badge: "منتج",
      badgeClass: "bg-cyan-500/10 text-cyan-400",
    };
  }

  if (type === "النظام") {
    return {
      icon: FiSettings,
      iconBg: "bg-gray-500/10",
      iconColor: "text-gray-400",
      badge: "النظام",
      badgeClass: "bg-gray-500/10 text-gray-400",
    };
  }

  return {
    icon: FiInfo,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    badge: "إشعار",
    badgeClass: "bg-indigo-500/10 text-indigo-400",
  };
};

const formatDate = (date) => {
  if (!date) return "";

  try {
    return new Date(date).toLocaleString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
};

export default function NotificationCard({
  notification,
  onMarkAsRead,
}) {
  const style = getNotificationStyle(notification);

  const Icon = style.icon;

  const isUnread = notification?.isRead === false;

  const handleClick = () => {
    if (isUnread && onMarkAsRead) {
      onMarkAsRead(notification);
    }
  };

  return (
    <div
      dir="rtl"
      onClick={handleClick}
      className={`relative rounded-2xl border bg-[#171717] p-3 transition-all duration-200 sm:p-4 lg:p-5 ${
        isUnread
          ? "cursor-pointer border-[#3A3A3A] hover:border-[#B8C9FF]/40 hover:bg-[#1A1A1A]"
          : "border-[#2B2B2B]"
      }`}
    >
      {isUnread && (
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#B8C9FF] sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5" />
      )}

      <div className="flex gap-2.5 sm:gap-3 lg:gap-4">
        {/* Icon */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 lg:h-12 lg:w-12 ${style.iconBg}`}
        >
          <Icon
            className={`h-4 w-4 sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5 ${style.iconColor}`}
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5 sm:mb-2 sm:gap-2">
            <h3 className="min-w-0 break-words text-sm font-bold text-white sm:text-base">
              {notification?.title || "إشعار"}
            </h3>

            {isUnread && (
              <span className="rounded-full bg-[#B8C9FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#B8C9FF] sm:px-2.5 sm:py-1 sm:text-xs">
                جديد
              </span>
            )}

            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium sm:px-2.5 sm:py-1 sm:text-xs ${style.badgeClass}`}
            >
              {style.badge}
            </span>
          </div>

          <p className="mb-3 break-words text-xs leading-6 text-gray-400 sm:mb-4 sm:text-sm sm:leading-7">
            {notification?.message ||
              "لا يوجد محتوى لهذا الإشعار."}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 sm:gap-4 sm:text-xs">
            <div className="flex items-center gap-1">
              <FiClock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

              <span className="break-words">
                {formatDate(
                  notification?.createdAt ||
                    notification?.createdat
                )}
              </span>
            </div>

            {notification?.priority && (
              <span>
                الأولوية: {notification.priority}
              </span>
            )}

            {notification?.isRead && (
              <div className="flex items-center gap-1 text-green-500">
                <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

                <span>تمت القراءة</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}