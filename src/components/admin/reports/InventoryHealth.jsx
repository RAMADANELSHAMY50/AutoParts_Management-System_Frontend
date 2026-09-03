import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function InventoryHealth() {
  const value = 75;

  const inventory = [
    {
      id: 1,
      title: "متوفر",
      value: "1,240",
      color: "#C7D2FE",
    },
    {
      id: 2,
      title: "منخفض",
      value: "84",
      color: "#FDBA74",
    },
    {
      id: 3,
      title: "نافذ",
      value: "12",
      color: "#FCA5A5",
    },
  ];

  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6 h-full">
      {/* Header */}
      <h2 className="text-white text-xl font-semibold text-center mb-8">
        صحة المخزون
      </h2>

      {/* Circle */}
      <div className="w-52 h-52 mx-auto">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: "#C7D2FE",
            trailColor: "#2A2A2A",
            textColor: "#FFFFFF",
            textSize: "16px",
            pathTransitionDuration: 1.5,
            strokeLinecap: "round",
          })}
        />
      </div>

      {/* Label */}
      <p className="text-center text-zinc-400 mt-3 mb-8">
        الكفاءة
      </p>

      {/* Stats */}
      <div className="space-y-4">
        {inventory.map((item) => (
          <div
            key={item.id}
            className="bg-[#222222] rounded-xl px-4 py-3 flex items-center justify-between"
          >
            <span className="text-white font-semibold">
              {item.value}
            </span>

            <div className="flex items-center gap-2">
              <span className="text-zinc-300">{item.title}</span>

              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}