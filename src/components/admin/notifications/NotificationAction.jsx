import React from "react";

import {
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineArrowDownTray,
  HiOutlineClipboardDocumentList,
  HiOutlineTruck,
  HiOutlineUser,
  HiOutlineDocumentText,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

import NotificationAction from "./NotificationAction";

const categoryStyle = {
  Inventory: {
    color: "red",
    icon: <HiOutlineExclamationTriangle size={24} />,
  },

  Orders: {
    color: "blue",
    icon: <HiOutlineTruck size={24} />,
  },

  POS: {
    color: "blue",
    icon: <HiOutlineCheckCircle size={24} />,
  },

  Customers: {
    color: "green",
    icon: <HiOutlineUser size={24} />,
  },

  Invoices: {
    color: "blue",
    icon: <HiOutlineDocumentText size={24} />,
  },

  Users: {
    color: "green",
    icon: <HiOutlineUser size={24} />,
  },

  System: {
    color: "orange",
    icon: <HiOutlineCog6Tooth size={24} />,
  },

  Errors: {
    color: "red",
    icon: <HiOutlineExclamationTriangle size={24} />,
  },
};

const colorClasses = {
  red: {
    border: "border-r-4 border-red-400",
    icon: "bg-red-600 text-white",
  },

  blue: {
    border: "border-r-4 border-blue-500",
    icon: "bg-blue-600 text-white",
  },

  orange: {
    border: "border-r-4 border-orange-400",
    icon: "bg-orange-600 text-white",
  },

  green: {
    border: "border-r-4 border-green-500",
    icon: "bg-green-600 text-white",
  },
};

export default function NotificationCard({
  notification,
}) {
  const category =
    categoryStyle[notification.category] ||
    categoryStyle.System;

  const style =
    colorClasses[category.color];

  return (
    <div
      dir="rtl"
      className={`
        relative overflow-hidden rounded-2xl
        bg-[#171717]
        ${style.border}
        p-6
        transition-all duration-300
        hover:bg-[#1d1d1d]
        hover:shadow-xl
      `}
    >
      {/* Time */}
      <span className="absolute left-6 top-5 text-xs text-gray-500">
        {notification.createdAt
          ? new Date(notification.createdAt).toLocaleString("ar-EG")
          : ""}
      </span>

      <div className="flex items-start justify-between gap-5">

        {/* Icon */}
        <div
          className={`
            flex h-14 w-14 shrink-0
            items-center justify-center
            rounded-2xl
            ${style.icon}
          `}
        >
          {category.icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-right">

          <h3 className="text-lg font-semibold text-white">
            {notification.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-300">
            {notification.message}
          </p>

          {/* Type / Priority */}
          <div className="mt-3 flex justify-end gap-2">
            <span className="rounded-full bg-[#252525] px-3 py-1 text-xs text-gray-300">
              {notification.type}
            </span>

            {notification.priority && (
              <span className="rounded-full bg-[#252525] px-3 py-1 text-xs text-gray-300">
                {notification.priority}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-5">
            <NotificationAction
              notification={notification}
            />
          </div>

        </div>
      </div>
    </div>
  );
}