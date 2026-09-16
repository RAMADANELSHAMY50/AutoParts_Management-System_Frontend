import React from "react";
import {
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";

export default function ThemeToggle({
  title,
  active = false,
  icon = "moon",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        justify-between
        gap-3
        rounded-xl
        border
        px-3
        py-3
        transition-all
        duration-300
        sm:px-5
        sm:py-4
        ${
          active
            ? "border-indigo-400 bg-[#252836] shadow-lg shadow-indigo-500/10"
            : "border-zinc-800 bg-[#1F1F1F] hover:border-zinc-600 hover:bg-[#252525]"
        }
      `}
    >
      {/* Switch */}
      <div
        className={`
          relative
          h-7
          w-12
          shrink-0
          rounded-full
          transition
          ${
            active
              ? "bg-indigo-300"
              : "bg-zinc-700"
          }
        `}
      >
        <span
          className={`
            absolute
            top-1
            h-5
            w-5
            rounded-full
            bg-white
            transition-all
            duration-300
            ${
              active
                ? "left-6 -translate-x-full"
                : "left-1"
            }
          `}
        />
      </div>

      {/* Title */}
      <span
        className="
          min-w-0
          flex-1
          text-right
          text-sm
          font-medium
          text-white
          sm:text-lg
        "
      >
        {title}
      </span>

      {/* Icon */}
      <div
        className={`
          shrink-0
          text-xl
          sm:text-2xl
          ${
            active
              ? "text-indigo-300"
              : "text-zinc-400"
          }
        `}
      >
        {icon === "moon" ? (
          <IoMoonOutline />
        ) : (
          <IoSunnyOutline />
        )}
      </div>
    </button>
  );
}