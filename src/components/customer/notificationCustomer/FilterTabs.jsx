import React from "react";

const tabs = [
  {
    id: "all",
    label: "الكل",
  },
  {
    id: "unread",
    label: "غير مقروء",
  },
];

export default function FilterTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      dir="rtl"
      className="mb-4 flex flex-wrap gap-2 sm:mb-5 sm:gap-3 lg:mb-6"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-sm lg:px-5 lg:py-3 ${
              isActive
                ? "bg-[#B8C9FF] text-[#111111] shadow-lg shadow-[#B8C9FF]/10"
                : "border border-[#2B2B2B] bg-[#171717] text-gray-400 hover:border-[#3A3A3A] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}