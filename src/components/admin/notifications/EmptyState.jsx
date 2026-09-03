import React from "react";
import { HiOutlineBellSlash } from "react-icons/hi2";

export default function EmptyState({
  title = "لا توجد إشعارات",
  description = "أنت على اطلاع كامل! لا توجد إشعارات جديدة في الوقت الحالي.",
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center rounded-2xl border border-[#2B2B2B] bg-[#171717] px-8 py-20 text-center"
    >
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#232323]">
        <HiOutlineBellSlash className="text-5xl text-gray-500" />
      </div>

      {/* Title */}
      <h2 className="mb-3 text-2xl font-bold text-white">
        {title}
      </h2>

      {/* Description */}
      <p className="max-w-md text-sm leading-7 text-gray-400">
        {description}
      </p>
    </div>
  );
}