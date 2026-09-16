import React from "react";

import {
  HiOutlineCheckCircle,
  HiOutlineSparkles,
} from "react-icons/hi";

export default function Description({
  title = "نظرة عامة على المنتج",
  description,
  features = [],
  packageIncludes = [],
}) {
  return (
    <div className="space-y-6 rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:space-y-8 sm:rounded-2xl sm:p-6">
      {/* Overview */}
      <div>
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <HiOutlineSparkles className="shrink-0 text-xl text-blue-500 sm:text-2xl" />

          <h2 className="break-words text-lg font-bold text-white sm:text-2xl">
            {title}
          </h2>
        </div>

        <p className="break-words text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          {description ||
            "لا يوجد وصف متاح لهذا المنتج حاليًا."}
        </p>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
            المميزات الرئيسية
          </h3>

          <div className="space-y-3">
            {features.map(
              (feature, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-2.5 sm:gap-3"
                >
                  <HiOutlineCheckCircle className="mt-1 h-5 w-5 shrink-0 text-blue-500" />

                  <p className="break-words text-sm leading-6 text-zinc-300 sm:text-base">
                    {feature}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Package */}
      {packageIncludes.length > 0 && (
        <div>
          <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
            محتويات العبوة
          </h3>

          <ul className="space-y-3">
            {packageIncludes.map(
              (item, index) => (
                <li
                  key={index}
                  className="flex min-w-0 items-start gap-2.5 text-sm leading-6 text-zinc-300 sm:gap-3 sm:text-base"
                >
                  <HiOutlineCheckCircle className="mt-1 h-5 w-5 shrink-0 text-blue-500" />

                  <span className="break-words">
                    {item}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}