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
} from "react-icons/fi";

// ==========================================
// Notification Configuration
// ==========================================
const getNotificationStyle = (notification) => {
  const type = notification?.type || "";
  const title = notification?.title || "";

  // ========================================
  // Low Stock
  // ========================================
  if (
    type === "مخزون منخفض" ||
    title.includes("مخزون") ||
    title.includes("منخفض")
  ) {
    return {
      icon: FiAlertTriangle,
      iconColor: "text-yellow-400",
      iconBg: "bg-yellow-400/10",
      border: "border-yellow-500/30",
      badgeBg: "bg-yellow-500/10",
      badgeText: "text-yellow-400",
      badge: "مخزون منخفض",
    };
  }

  // ========================================
  // New Offer
  // ========================================
  if (
    type === "عرض جديد" ||
    title.includes("عرض")
  ) {
    return {
      icon: FiTag,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-400/10",
      border: "border-purple-500/30",
      badgeBg: "bg-purple-500/10",
      badgeText: "text-purple-400",
      badge: "عرض جديد",
    };
  }

  // ========================================
  // New Customer
  // ========================================
  if (
    type === "عميل جديد" ||
    title.includes("عميل")
  ) {
    return {
      icon: FiUserPlus,
      iconColor: "text-green-400",
      iconBg: "bg-green-400/10",
      border: "border-green-500/30",
      badgeBg: "bg-green-500/10",
      badgeText: "text-green-400",
      badge: "عميل جديد",
    };
  }

  // ========================================
  // Invoice
  // ========================================
  if (
    type === "تم إنشاء الفاتورة" ||
    title.includes("فاتورة") ||
    title.includes("طلب")
  ) {
    return {
      icon: FiFileText,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-400/10",
      border: "border-blue-500/30",
      badgeBg: "bg-blue-500/10",
      badgeText: "text-blue-400",
      badge: "فاتورة",
    };
  }

  // ========================================
  // Product
  // ========================================
  if (
    title.includes("منتج") ||
    title.includes("إضافة") ||
    title.includes("تعديل")
  ) {
    return {
      icon: FiPackage,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-400/10",
      border: "border-cyan-500/30",
      badgeBg: "bg-cyan-500/10",
      badgeText: "text-cyan-400",
      badge: "منتج",
    };
  }

  // ========================================
  // System
  // ========================================
  if (type === "النظام") {
    return {
      icon: FiSettings,
      iconColor: "text-gray-300",
      iconBg: "bg-gray-400/10",
      border: "border-gray-500/30",
      badgeBg: "bg-gray-400/10",
      badgeText: "text-gray-300",
      badge: "النظام",
    };
  }

  // ========================================
  // Default
  // ========================================
  return {
    icon: FiInfo,
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-400/10",
    border: "border-indigo-500/30",
    badgeBg: "bg-indigo-400/10",
    badgeText: "text-indigo-400",
    badge: "تنبيه",
  };
};

// ==========================================
// Format Time
// ==========================================
const formatDate = (date) => {
  if (!date) {
    return "";
  }

  const notificationDate = new Date(date);

  if (Number.isNaN(notificationDate.getTime())) {
    return "";
  }

  return notificationDate.toLocaleString("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ==========================================
// Component
// ==========================================
export default function NotificationCard({
  notification,
}) {
  const style = getNotificationStyle(notification);

  const Icon = style.icon;

  const isUnread = notification?.isRead === false;

  return (
    <div
      dir="rtl"
      className={`
        group
        relative
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        ${style.border}
        bg-[#1A1A1A]
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-[#202020]
        hover:shadow-xl

        sm:p-5
      `}
    >
      {/* ======================================
          New Indicator
      ====================================== */}
      {isUnread && (
        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-1
            bg-red-500
          "
        />
      )}

      {/* ======================================
          Main Content
      ====================================== */}
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">

        {/* ====================================
            Icon
        ==================================== */}
        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${style.iconBg}

            sm:h-14
            sm:w-14
            sm:rounded-2xl
          `}
        >
          <Icon
            size={22}
            className={`
              ${style.iconColor}

              sm:hidden
            `}
          />

          <Icon
            size={27}
            className={`
              ${style.iconColor}

              hidden
              sm:block
            `}
          />
        </div>

        {/* ====================================
            Content
        ==================================== */}
        <div className="min-w-0 flex-1">

          {/* ==================================
              Top
          ================================== */}
          <div
            className="
              flex
              min-w-0
              flex-col
              items-start
              gap-2

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:gap-3
            "
          >

            {/* Title + New */}
            <div
              className="
                flex
                min-w-0
                max-w-full
                flex-wrap
                items-center
                gap-2
              "
            >
              <h3
                className={`
                  min-w-0
                  max-w-full
                  break-words
                  text-sm
                  font-bold
                  leading-6

                  sm:text-lg
                  sm:leading-7

                  ${
                    isUnread
                      ? "text-white"
                      : "text-gray-300"
                  }
                `}
              >
                {notification.title}
              </h3>

              {/* New */}
              {isUnread && (
                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-red-500/10
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-red-400

                    sm:px-2.5
                    sm:text-[11px]
                  "
                >
                  جديد
                </span>
              )}
            </div>

            {/* Type */}
            <span
              className={`
                shrink-0
                rounded-full
                px-2.5
                py-1
                text-[10px]
                font-semibold

                sm:px-3
                sm:text-xs

                ${style.badgeBg}
                ${style.badgeText}
              `}
            >
              {style.badge}
            </span>
          </div>

          {/* ==================================
              Message
          ================================== */}
          <p
            className="
              mt-3
              break-words
              text-xs
              leading-6
              text-gray-400

              sm:text-sm
              sm:leading-7
            "
          >
            {notification.message}
          </p>

          {/* ==================================
              Bottom Information
          ================================== */}
          <div
            className="
              mt-4
              flex
              flex-col
              items-start
              gap-2
              text-[11px]
              text-gray-500

              sm:flex-row
              sm:flex-wrap
              sm:items-center
              sm:gap-5
              sm:text-xs
            "
          >

            {/* Time */}
            <div className="flex min-w-0 items-center gap-1.5">
              <FiClock
                size={13}
                className="shrink-0"
              />

              <span className="break-words">
                {formatDate(notification.createdAt)}
              </span>
            </div>

            {/* Category */}
            {notification.category && (
              <span className="break-words">
                التصنيف:{" "}
                <span className="text-gray-300">
                  {notification.category}
                </span>
              </span>
            )}

            {/* Priority */}
            {notification.priority && (
              <span className="break-words">
                الأولوية:{" "}
                <span className="text-gray-300">
                  {notification.priority}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}