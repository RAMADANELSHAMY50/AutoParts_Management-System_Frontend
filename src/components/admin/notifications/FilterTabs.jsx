import React from "react";

const tabs = [
  { id: "all", label: "الكل" },
  { id: "Inventory", label: "المخزون" },
  { id: "Orders", label: "الطلبات" },
  { id: "POS", label: "المبيعات" },
  { id: "Customers", label: "العملاء" },
  { id: "Invoices", label: "الفواتير" },
  { id: "Users", label: "المستخدمين" },
  { id: "System", label: "النظام" },
  { id: "Errors", label: "الأخطاء" },
];

export default function FilterTabs({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="mb-6 flex justify-end" dir="rtl">
      <div className="flex flex-wrap items-center justify-end gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              rounded-full px-5 py-2 text-sm font-medium
              transition-all duration-300
              ${
                activeTab === tab.id
                  ? "bg-[#B8C9FF] text-[#111827] shadow-md"
                  : "bg-[#1E1E1E] text-gray-300 hover:bg-[#2A2A2A]"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}