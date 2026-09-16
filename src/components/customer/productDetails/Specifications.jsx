import React from "react";

const Specifications = ({
  specifications = {},
}) => {
  const entries =
    Object.entries(specifications);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#171717] sm:rounded-2xl">

      {/* Header */}
      <div className="border-b border-zinc-800 px-3 py-3 sm:px-6 sm:py-4">
        <h2 className="text-base font-bold text-white sm:text-xl">
          مواصفات المنتج
        </h2>
      </div>

      {/* Specifications */}
      <div>
        {entries.length > 0 ? (
          entries.map(
            ([label, value], index) => (
              <div
                key={label}
                className={`grid grid-cols-1 gap-1.5 px-3 py-3 sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-4 ${
                  index !==
                  entries.length - 1
                    ? "border-b border-zinc-800"
                    : ""
                }`}
              >
                <div className="text-xs font-medium text-zinc-500 sm:text-sm">
                  {label}
                </div>

                <div className="break-words text-sm font-medium text-white sm:text-base">
                  {value || "غير متوفر"}
                </div>
              </div>
            )
          )
        ) : (
          <div className="px-3 py-8 text-center text-sm text-zinc-500 sm:px-6 sm:py-10">
            لا توجد مواصفات متاحة لهذا المنتج
          </div>
        )}
      </div>
    </div>
  );
};

export default Specifications;