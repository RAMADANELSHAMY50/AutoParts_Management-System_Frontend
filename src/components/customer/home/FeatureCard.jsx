import React from "react";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-zinc-800 bg-[#181818] p-5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-[#1D1D1D] sm:p-8">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:rotate-6 sm:mb-6 sm:h-16 sm:w-16">
        <div className="scale-75 sm:scale-100">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-lg font-semibold text-white sm:text-xl">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-3 text-xs leading-6 text-zinc-400 sm:mt-4 sm:text-sm sm:leading-7">
        {description}
      </p>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all duration-500 group-hover:w-full" />

      {/* Decorative Circle */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/5 blur-2xl transition-all duration-500 group-hover:scale-150" />

    </div>
  );
}