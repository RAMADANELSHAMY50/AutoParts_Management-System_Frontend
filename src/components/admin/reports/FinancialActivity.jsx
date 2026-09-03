import React from "react";
import {
  MdArrowOutward,
  MdArrowDownward,
} from "react-icons/md";

export default function FinancialActivity() {
  const activities = [
    {
      id: 1,
      title: "دفعة واردة",
      description: "طلب #INV-2458",
      amount: "+ ر.س 12,500",
      date: "منذ ساعتين",
      positive: true,
    },
    {
      id: 2,
      title: "استرداد مبلغ",
      description: "طلب #INV-2431",
      amount: "- ر.س 2,300",
      date: "منذ 5 ساعات",
      positive: false,
    },
    {
      id: 3,
      title: "دفعة واردة",
      description: "طلب #INV-2420",
      amount: "+ ر.س 8,750",
      date: "أمس",
      positive: true,
    },
    {
      id: 4,
      title: "رسوم شحن",
      description: "شركة النقل",
      amount: "- ر.س 980",
      date: "أمس",
      positive: false,
    },
  ];

  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-indigo-300 text-sm hover:text-indigo-200 transition">
          عرض الكل
        </button>

        <h2 className="text-xl font-semibold text-white">
          النشاط المالي
        </h2>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between rounded-xl bg-[#202020] border border-zinc-800 p-4 hover:border-zinc-700 transition"
          >
            {/* Amount */}
            <div className="text-left">
              <p
                className={`font-bold ${
                  activity.positive
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {activity.amount}
              </p>

              <p className="text-xs text-zinc-500 mt-1">
                {activity.date}
              </p>
            </div>

            {/* Info */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <h3 className="text-white font-medium">
                  {activity.title}
                </h3>

                <p className="text-zinc-400 text-sm mt-1">
                  {activity.description}
                </p>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  activity.positive
                    ? "bg-green-500/15"
                    : "bg-red-500/15"
                }`}
              >
                {activity.positive ? (
                  <MdArrowDownward className="text-2xl text-green-400" />
                ) : (
                  <MdArrowOutward className="text-2xl text-red-400" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Summary */}
      <div className="mt-6 border-t border-zinc-800 pt-4 flex items-center justify-between">
        <div className="text-right">
          <p className="text-zinc-400 text-sm">
            صافي التدفق النقدي
          </p>

          <h3 className="text-2xl font-bold text-green-400 mt-1">
            + ر.س 17,970
          </h3>
        </div>

        <div className="bg-green-500/15 text-green-400 px-4 py-2 rounded-lg text-sm font-medium">
          +12.8%
        </div>
      </div>
    </div>
  );
}