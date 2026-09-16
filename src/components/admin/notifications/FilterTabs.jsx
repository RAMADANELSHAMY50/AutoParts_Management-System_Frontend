import React from "react";

const tabs = [
  {
    id: "all",
    label: "الكل",
  },
  {
    id: "Inventory",
    label: "المخزون",
  },
  {
    id: "Orders",
    label: "الطلبات",
  },
  {
    id: "POS",
    label: "المبيعات",
  },
  {
    id: "Customers",
    label: "العملاء",
  },
  {
    id: "Invoices",
    label: "الفواتير",
  },
  {
    id: "System",
    label: "النظام",
  },
];

export default function FilterTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      className="
        mb-5
        w-full
        overflow-x-auto
        pb-2
        scrollbar-thin
        scrollbar-track-transparent
        scrollbar-thumb-[#333]
        sm:mb-6
      "
      dir="rtl"
    >
      <div className="flex min-w-max gap-2 sm:gap-3">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                shrink-0
                rounded-full
                px-4
                py-2
                text-xs
                font-medium
                whitespace-nowrap
                transition-all
                duration-300

                sm:px-5
                sm:py-2.5
                sm:text-sm

                ${
                  active
                    ? `
                      bg-[#B8C9FF]
                      text-[#111827]
                      shadow-lg
                    `
                    : `
                      border
                      border-gray-800
                      bg-[#1E1E1E]
                      text-gray-300
                      hover:bg-[#292929]
                      hover:text-white
                    `
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}