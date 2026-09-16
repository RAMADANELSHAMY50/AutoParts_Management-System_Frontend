import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:1337";

export default function ProductCard({ product }) {
  const {
    name,
    category,
    image,
    price,
    oldPrice,
    rating,
    isNew,
  } = product;

  const imageUrl = image?.url
    ? `${API_URL}${image.url}`
    : "/placeholder.jpg";

  return (
    <div
      dir="rtl"
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#181818] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40"
    >

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={imageUrl}
          alt={name || "صورة المنتج"}
          className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110 sm:h-60 md:h-72"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* New Badge */}
        {isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-semibold text-white sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
            جديد
          </span>
        )}

        {/* Actions */}
        <div className="absolute right-3 top-3 flex translate-x-10 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-4 sm:top-4 sm:gap-3">

          <button
            type="button"
            title="إضافة إلى المفضلة"
            aria-label="إضافة إلى المفضلة"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-zinc-900 shadow-lg transition hover:bg-indigo-600 hover:text-white sm:h-10 sm:w-10 sm:text-base"
          >
            <FiHeart />
          </button>

          <button
            type="button"
            title="عرض المنتج"
            aria-label="عرض المنتج"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm text-zinc-900 shadow-lg transition hover:bg-indigo-600 hover:text-white sm:h-10 sm:w-10 sm:text-base"
          >
            <FiEye />
          </button>

        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-3.5 sm:space-y-4 sm:p-5">

        {/* Category + Rating */}
        <div className="flex items-center justify-between">

          <span className="max-w-[55%] truncate rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] text-zinc-300 sm:px-3 sm:text-xs">
            {category?.name || "بدون تصنيف"}
          </span>

          <div className="flex items-center gap-1 text-yellow-400">
            <FiStar
              className="fill-yellow-400"
              size={12}
            />

            <span className="text-xs text-white sm:text-sm">
              {rating || "0"}
            </span>
          </div>

        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-base font-semibold text-white transition group-hover:text-indigo-400 sm:text-lg">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 sm:gap-3">

          <span className="text-xl font-bold text-indigo-400 sm:text-2xl">
            {price} ر.س
          </span>

          {oldPrice && (
            <span className="text-xs text-zinc-500 line-through sm:text-sm">
              {oldPrice} ر.س
            </span>
          )}

        </div>

        {/* Button */}
        <Link
          to={`/productdetails/${product.id}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-indigo-700 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
        >
          <FiShoppingCart size={16} />
          أضف إلى السلة
        </Link>

      </div>
    </div>
  );
}