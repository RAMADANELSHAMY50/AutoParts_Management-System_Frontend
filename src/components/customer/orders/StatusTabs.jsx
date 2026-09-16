const StatusTabs = ({
  activeTab,
  setActiveTab,
  orders = [],
}) => {
  const tabs = [
    {
      key: "all",
      label: "الكل",
      count: orders.length,
    },
    {
      key: "processing",
      label: "قيد التنفيذ",
      count: orders.filter((order) => order.status === "processing").length,
    },
    {
      key: "delivered",
      label: "تم التوصيل",
      count: orders.filter((order) => order.status === "delivered").length,
    },
    {
      key: "cancelled",
      label: "ملغي",
      count: orders.filter((order) => order.status === "cancelled").length,
    },
  ];

  return (
    <div className="mb-5 overflow-x-auto border-b border-zinc-800 sm:mb-6 lg:mb-8">
      <div className="flex min-w-max gap-4 sm:gap-6 lg:gap-10">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-1.5 pb-3 text-sm transition sm:gap-2 sm:pb-4 sm:text-base lg:text-lg ${
                active
                  ? "font-bold text-[#A5B4FC]"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>

              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] sm:px-2 sm:py-0.5 sm:text-[10px] ${
                  active
                    ? "bg-[#A5B4FC]/10 text-[#A5B4FC]"
                    : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {tab.count}
              </span>

              {active && (
                <span className="absolute bottom-0 right-0 left-0 h-0.5 rounded-full bg-[#A5B4FC]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTabs;