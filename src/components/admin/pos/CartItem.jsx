import React from "react";
import {
  MdAdd,
  MdRemove,
  MdDeleteOutline,
} from "react-icons/md";

export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  return (
    <div className="flex gap-2.5 rounded-xl border border-zinc-800 bg-[#232323] p-2.5 transition hover:border-zinc-700 sm:gap-4 sm:p-4">
      {/* Image */}
      <img
        src={item.image || "/placeholder.jpg"}
        alt={item.name}
        className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20 sm:rounded-xl"
      />

      {/* Product */}
      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-white sm:text-base">
          {item.name}
        </h3>

        {item.sku && (
          <p className="mt-1 text-[10px] text-zinc-500 sm:text-xs">
            SKU: {item.sku}
          </p>
        )}

        <p className="mt-1.5 text-sm font-bold text-blue-500 sm:mt-2 sm:text-base">
          {Number(item.price || 0).toFixed(2)} ر.س
        </p>

        {/* Quantity */}
        <div className="mt-2.5 flex items-center gap-1.5 sm:mt-4 sm:gap-3">
          <button
            type="button"
            onClick={() =>
              decreaseQty(item.id)
            }
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2d2d2d] text-white transition hover:bg-zinc-700 sm:h-8 sm:w-8"
          >
            <MdRemove />
          </button>

          <span className="w-7 text-center text-sm text-white sm:w-8">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              increaseQty(item.id)
            }
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 sm:h-8 sm:w-8"
          >
            <MdAdd />
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 flex-col items-end justify-between">
        <button
          type="button"
          onClick={() =>
            removeItem(item.id)
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <MdDeleteOutline size={20} />
        </button>

        <p className="text-sm font-bold text-white sm:text-lg">
          {(
            Number(item.price || 0) *
            Number(item.quantity || 0)
          ).toFixed(2)}{" "}
          ر.س
        </p>
      </div>
    </div>
  );
}