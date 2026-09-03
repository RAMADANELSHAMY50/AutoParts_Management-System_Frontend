import { useState } from "react";

const tabs = [
  {
    id: "all",
    label: "الكل",
    count: 12,
  },
  {
    id: "processing",
    label: "قيد التنفيذ",
    count: 2,
  },
  {
    id: "delivered",
    label: "تم التوصيل",
    count: 10,
  },
  {
    id: "cancelled",
    label: "ملغية",
    count: 0,
  },
];

const StatusTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="border-b border-zinc-800">
      <div className="flex flex-wrap items-center justify-end gap-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-4 text-lg font-semibold transition ${
              activeTab === tab.id
                ? "text-[#A5B4FC]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span>
              {tab.label} ({tab.count})
            </span>

            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-full bg-[#A5B4FC]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StatusTabs;