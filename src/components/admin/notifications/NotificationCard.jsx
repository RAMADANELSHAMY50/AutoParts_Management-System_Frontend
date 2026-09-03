import React from "react";
import NotificationAction from "./NotificationAction";

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

export default function NotificationCard({ notification }) {
  const style = colorClasses[notification.color] || colorClasses.blue;

  return (
    <div
      dir="rtl"
      className={`relative overflow-hidden rounded-2xl bg-[#171717] ${style.border} p-6 transition-all duration-300 hover:bg-[#1d1d1d] hover:shadow-xl`}
    >
      {/* Time */}
      <span className="absolute left-6 top-5 text-xs text-gray-500">
        {notification.time}
      </span>

      <div className="flex items-start justify-between gap-5">
        {/* Icon */}
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${style.icon}`}
        >
          {notification.icon}
        </div>

        {/* Content */}
        <div className="flex-1 text-right">
          <h3 className="text-lg font-semibold text-white">
            {notification.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-300">
            {notification.message}
          </p>

          {/* Actions */}
          <div className="mt-5">
            <NotificationAction notification={notification} />
          </div>
        </div>
      </div>
    </div>
  );
}