import React from "react";

export default function BrandPerformance() {
  const brands = [
    {
      id: 1,
      name: "TOYOTA",
      sales: 420,
      progress: 92,
      color: "bg-blue-400",
    },
    {
      id: 2,
      name: "NISSAN",
      sales: 365,
      progress: 80,
      color: "bg-violet-400",
    },
    {
      id: 3,
      name: "HONDA",
      sales: 290,
      progress: 65,
      color: "bg-emerald-400",
    },
    {
      id: 4,
      name: "HYUNDAI",
      sales: 240,
      progress: 55,
      color: "bg-amber-400",
    },
    {
      id: 5,
      name: "KIA",
      sales: 180,
      progress: 42,
      color: "bg-red-400",
    },
  ];

  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button className="text-indigo-300 hover:text-indigo-200 text-sm transition">
          عرض التقرير
        </button>

        <div className="text-right">
          <h2 className="text-xl font-semibold text-white">
            أداء العلامات التجارية
          </h2>

          <p className="text-sm text-zinc-400 mt-1">
            أكثر العلامات مبيعًا هذا الشهر
          </p>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-6">
        {brands.map((brand) => (
          <div key={brand.id}>
            {/* Name + Sales */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-zinc-300 font-medium">
                {brand.sales} طلب
              </span>

              <span className="text-white font-semibold">
                {brand.name}
              </span>
            </div>

            {/* Progress */}
            <div className="w-full h-3 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className={`${brand.color} h-full rounded-full transition-all duration-700`}
                style={{ width: `${brand.progress}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-start mt-2">
              <span className="text-xs text-zinc-500">
                {brand.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t border-zinc-800 pt-5">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-green-400 font-bold text-lg">
              +18.6%
            </span>

            <p className="text-xs text-zinc-500 mt-1">
              مقارنة بالشهر الماضي
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-white font-semibold">
              إجمالي المبيعات
            </h3>

            <p className="text-zinc-400 text-sm">
              1,495 طلب
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}