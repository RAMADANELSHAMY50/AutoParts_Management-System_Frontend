import React from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiEye,
} from "react-icons/fi";
import image from "../../../assets/images/hero.jpg"
import { Link } from "react-router-dom";

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

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#181818] transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* New Badge */}
        {isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
            NEW
          </span>
        )}

        {/* Actions */}
        <div className="absolute right-4 top-4 flex translate-x-10 flex-col gap-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition hover:bg-indigo-600 hover:text-white">
            <FiHeart />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition hover:bg-indigo-600 hover:text-white">
            <FiEye />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Category + Rating */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
            {category}
          </span>

          <div className="flex items-center gap-1 text-yellow-400">
            <FiStar className="fill-yellow-400" size={15} />
            <span className="text-sm text-white">{rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-indigo-400">
          {name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-indigo-400">
            ${price}
          </span>

          {oldPrice && (
            <span className="text-sm text-zinc-500 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <Link to={"/productdetails"} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700">
          <FiShoppingCart size={18} />
          Add to Cart
        </Link>
      </div>
    </div>
  );
}