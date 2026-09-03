import React from "react";
import image from "../../../assets/images/hero.jpg"

export default function CategoryCard({
  title,
  subtitle,
  image,
  className = "",
}) {
  return (
    <div
      className={`
        ${className}
        relative
        overflow-hidden
        rounded-2xl
        group
        cursor-pointer
        border
        border-zinc-800
        bg-zinc-900
        h-full
      `}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 right-0 w-full p-6 text-right">
        <h3 className="text-white text-2xl font-bold">
          {title}
        </h3>

        <p className="mt-2 text-sm text-zinc-300">
          {subtitle}
        </p>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-indigo-500/60 transition-all duration-300" />

      {/* Shine Effect */}
      <div className="absolute -left-40 top-0 h-full w-20 rotate-12 bg-white/10 blur-xl transition-all duration-700 group-hover:left-[120%]" />
    </div>
  );
}