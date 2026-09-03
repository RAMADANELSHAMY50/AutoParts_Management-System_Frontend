import React from "react";

export default function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-zinc-800 bg-[#181818] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-[#1D1D1D]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:bg-indigo-500 group-hover:text-white group-hover:rotate-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-sm leading-7 text-zinc-400">
        {description}
      </p>

      {/* Bottom Line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-indigo-500 transition-all duration-500 group-hover:w-full" />

      {/* Decorative Circle */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-indigo-500/5 blur-2xl transition-all duration-500 group-hover:scale-150" />
    </div>
  );
}