import React from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

export default function ThemeToggle({
  title,
  active = false,
  icon = "moon",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between rounded-xl border px-5 py-4 transition-all duration-300 ${
        active
          ? "bg-[#252836] border-indigo-400 shadow-lg shadow-indigo-500/10"
          : "bg-[#1F1F1F] border-zinc-800 hover:border-zinc-600 hover:bg-[#252525]"
      }`}
    >
      {/* Left Switch */}
      <div
        className={`relative w-12 h-7 rounded-full transition ${
          active ? "bg-indigo-300" : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
            active ? "left-6 -translate-x-full" : "left-1"
          }`}
        />
      </div>

      {/* Title */}
      <span className="text-white text-lg font-medium">
        {title}
      </span>

      {/* Icon */}
      <div
        className={`text-2xl ${
          active ? "text-indigo-300" : "text-zinc-400"
        }`}
      >
        {icon === "moon" ? <IoMoonOutline /> : <IoSunnyOutline />}
      </div>
    </button>
  );
}