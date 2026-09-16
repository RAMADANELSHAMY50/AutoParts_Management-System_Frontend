import React from "react";
import { HiOutlineBellSlash } from "react-icons/hi2";

export default function EmptyState({
  title = "لا توجد إشعارات",
  description = "لا توجد إشعارات جديدة في الوقت الحالي.",
}) {
  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-center rounded-2xl border border-[#2B2B2B] bg-[#171717] px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#232323] sm:mb-5 sm:h-18 sm:w-18 lg:mb-6 lg:h-20 lg:w-20">
        <HiOutlineBellSlash className="text-4xl text-gray-500 sm:text-[2.75rem] lg:text-5xl" />
      </div>

      <h2 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl lg:text-2xl">
        {title}
      </h2>

      <p className="max-w-md text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7">
        {description}
      </p>
    </div>
  );
}