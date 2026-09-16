import { useState } from "react";

import {
  HiOutlineHeart,
  HiMinus,
  HiPlus,
} from "react-icons/hi";

import { FiShoppingCart } from "react-icons/fi";

export default function AddToCart({
  stock = 0,
  onAddToCart,
  onBuyNow,
  onWishlist,
}) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Quantity */}
      <div>
        <p className="mb-2 text-xs font-medium text-zinc-300 sm:mb-3 sm:text-sm">
          الكمية
        </p>

        <div className="flex w-fit items-center overflow-hidden rounded-lg border border-zinc-700 bg-[#171717] sm:rounded-xl">
          <button
            type="button"
            onClick={decrease}
            disabled={quantity <= 1}
            className="p-2.5 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:p-4"
          >
            <HiMinus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <span className="w-10 text-center text-base font-semibold text-white sm:w-16 sm:text-lg">
            {quantity}
          </span>

          <button
            type="button"
            onClick={increase}
            disabled={
              stock <= 0 ||
              quantity >= stock
            }
            className="p-2.5 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 sm:p-4"
          >
            <HiPlus className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        <p className="mt-1.5 text-[11px] text-zinc-500 sm:mt-2 sm:text-sm">
          {stock > 0
            ? `${stock} قطعة متاحة`
            : "لا توجد قطع متاحة"}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        {/* Wishlist */}
        <button
          type="button"
          onClick={onWishlist}
          aria-label="إضافة إلى المفضلة"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-[#171717] transition hover:border-blue-600 sm:h-14 sm:w-14 sm:rounded-xl"
        >
          <HiOutlineHeart className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={() =>
            onAddToCart(quantity)
          }
          disabled={stock === 0}
          className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-2.5 py-3 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-700 sm:gap-2 sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
        >
          <FiShoppingCart className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

          <span className="truncate">
            {stock > 0
              ? "أضف إلى السلة"
              : "غير متوفر"}
          </span>
        </button>
      </div>

      {/* Buy Now */}
      <button
        type="button"
        onClick={() =>
          onBuyNow(quantity)
        }
        disabled={stock === 0}
        className="w-full rounded-lg border border-blue-600 py-3 text-xs font-semibold text-blue-500 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500 sm:rounded-xl sm:py-4 sm:text-base"
      >
        اشترِ الآن
      </button>
    </div>
  );
}