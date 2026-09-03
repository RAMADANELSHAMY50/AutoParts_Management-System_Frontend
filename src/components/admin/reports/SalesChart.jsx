import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const yearlyData = [
  { month: "يناير", sales: 85 },
  { month: "فبراير", sales: 78 },
  { month: "مارس", sales: 72 },
  { month: "أبريل", sales: 65 },
  { month: "مايو", sales: 62 },
  { month: "يونيو", sales: 60 },
  { month: "يوليو", sales: 40 },
  { month: "أغسطس", sales: 22 },
  { month: "سبتمبر", sales: 18 },
  { month: "أكتوبر", sales: 20 },
  { month: "نوفمبر", sales: 22 },
  { month: "ديسمبر", sales: 24 },
];

const monthlyData = [
  { month: "الأسبوع 1", sales: 22 },
  { month: "الأسبوع 2", sales: 48 },
  { month: "الأسبوع 3", sales: 40 },
  { month: "الأسبوع 4", sales: 70 },
];

export default function SalesChart() {
  const [mode, setMode] = useState("year");

  const data = mode === "year" ? yearlyData : monthlyData;

  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode("month")}
            className={`px-5 py-2 rounded-lg text-sm transition-all ${
              mode === "month"
                ? "bg-indigo-300 text-black"
                : "bg-[#262626] text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            شهري
          </button>

          <button
            onClick={() => setMode("year")}
            className={`px-5 py-2 rounded-lg text-sm transition-all ${
              mode === "year"
                ? "bg-indigo-300 text-black"
                : "bg-[#262626] text-zinc-400 hover:bg-zinc-700"
            }`}
          >
            سنوي
          </button>
        </div>

        {/* Title */}
        <div className="text-right">
          <h2 className="text-white text-xl font-semibold">
            اتجاهات المبيعات الشهرية
          </h2>

          <p className="text-zinc-400 text-sm mt-1">
            مقارنة أداء المبيعات على مدار السنة الحالية
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -20,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="#2d2d2d"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#888"
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              stroke="#888"
              tick={{ fill: "#A1A1AA", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#1F1F1F",
                border: "1px solid #333",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#C7D2FE"
              strokeWidth={4}
              dot={{
                fill: "#C7D2FE",
                strokeWidth: 0,
                r: 5,
              }}
              activeDot={{
                r: 8,
                fill: "#ffffff",
                stroke: "#C7D2FE",
                strokeWidth: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}