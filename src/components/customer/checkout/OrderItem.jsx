// OrderItem.jsx

import { Minus, Plus } from "lucide-react";

export default function OrderItem({ product }) {
  const {
    name,
    image,
    price,
    quantity,
  } = product;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-[#1E1E1E] p-4">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#242424]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col text-right">
        <h3 className="text-base font-semibold text-white">
          {name}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          قطعة أصلية عالية الجودة
        </p>

        <div className="mt-4 flex items-center justify-between">
          {/* Price */}
          <span className="text-lg font-bold text-[#B7C9FF]">
            {price.toLocaleString()} ر.س
          </span>

          {/* Quantity */}
          <div className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-[#242424] px-3 py-2">
            <button
              type="button"
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-[20px] text-center text-white font-medium">
              {quantity}
            </span>

            <button
              type="button"
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}