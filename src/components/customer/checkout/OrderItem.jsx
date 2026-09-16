import { Minus, Plus } from "lucide-react";

export default function OrderItem({ product }) {
  const {
    name,
    image,
    price,
    quantity,
  } = product;

  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-[#1E1E1E] p-2.5 sm:gap-3 sm:p-3 lg:gap-4 lg:p-4">
      {/* Product Image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#242424] sm:h-20 sm:w-20 lg:h-24 lg:w-24">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1 text-right">
        <h3 className="truncate text-xs font-semibold text-white sm:text-sm lg:text-base">
          {name}
        </h3>

        <p className="mt-1 text-[10px] text-zinc-400 sm:text-xs lg:text-sm">
          قطعة أصلية عالية الجودة
        </p>

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          {/* Price */}
          <span className="text-sm font-bold text-[#B7C9FF] sm:text-base lg:text-lg">
            {price.toLocaleString()} ر.س
          </span>

          {/* Quantity */}
          <div className="flex w-fit items-center gap-2 rounded-lg border border-zinc-700 bg-[#242424] px-2 py-1.5 sm:gap-3 sm:px-3 sm:py-2">
            <button
              type="button"
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              <Minus size={14} className="sm:h-4 sm:w-4" />
            </button>

            <span className="min-w-[18px] text-center text-xs font-medium text-white sm:min-w-[20px] sm:text-sm">
              {quantity}
            </span>

            <button
              type="button"
              className="rounded-md p-1 text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
            >
              <Plus size={14} className="sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}