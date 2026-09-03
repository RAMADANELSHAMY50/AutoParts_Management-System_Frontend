import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "يناير", sales: 4200, target: 6000 },
  { month: "فبراير", sales: 6500, target: 7200 },
  { month: "مارس", sales: 5100, target: 6600 },
  { month: "أبريل", sales: 7200, target: 8500 },
  { month: "مايو", sales: 4200, target: 6000 },
  { month: "يونيو", sales: 5600, target: 6600 },
  { month: "يوليو", sales: 4200, target: 5100 },
];

export default function SalesChart() {
  return (
    <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6 h-[430px]">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">

        <div className="flex gap-2">
          <button className="bg-indigo-300 text-black text-sm font-medium px-5 py-2 rounded-xl">
            شهري
          </button>

          <button className="bg-[#262626] text-gray-300 text-sm font-medium px-5 py-2 rounded-xl hover:bg-[#333] transition">
            سنوي
          </button>
        </div>

        <div className="text-right">
          <h2 className="text-white text-3xl font-bold">
            تحليلات المبيعات السنوية
          </h2>

          <p className="text-gray-400 mt-2">
            مقارنة أداء المبيعات على مدار العام
          </p>
        </div>

      </div>

      {/* Chart */}

      <ResponsiveContainer width="100%" height="78%">
        <BarChart data={data} barGap={8}>

          <CartesianGrid
            stroke="#2d2d2d"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{ fill: "#888" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "#222" }}
            contentStyle={{
              background: "#1F1F1F",
              border: "1px solid #333",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          {/* الخلفية */}
          <Bar
            dataKey="target"
            fill="#2B2B35"
            radius={[8, 8, 0, 0]}
          />

          {/* المبيعات */}
          <Bar
            dataKey="sales"
            fill="#9FA8FF"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}