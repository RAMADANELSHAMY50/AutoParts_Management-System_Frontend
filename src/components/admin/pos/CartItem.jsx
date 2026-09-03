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
    <div className="flex gap-4 rounded-2xl bg-[#232323] p-4 border border-zinc-800 hover:border-zinc-700 transition">

      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 rounded-xl object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">

        <h3 className="text-white font-semibold">
          {item.name}
        </h3>

        {item.sku && (
          <p className="text-xs text-zinc-500 mt-1">
            SKU: {item.sku}
          </p>
        )}

        <p className="text-blue-500 font-bold mt-2">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-3 mt-4">

          <button
            onClick={() => decreaseQty(item.id)}
            className="w-8 h-8 rounded-lg bg-[#2d2d2d] hover:bg-zinc-700 flex items-center justify-center transition"
          >
            <MdRemove className="text-white" />
          </button>

          <span className="text-white font-medium min-w-[24px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQty(item.id)}
            className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition"
          >
            <MdAdd className="text-white" />
          </button>

        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-between items-end">

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-400 transition"
        >
          <MdDeleteOutline size={22} />
        </button>

        <p className="text-lg font-bold text-white">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

      </div>

    </div>
  );
}