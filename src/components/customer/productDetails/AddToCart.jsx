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
    <div className="space-y-5">
      {/* Quantity */}
      <div>
        <p className="mb-3 text-sm font-medium text-zinc-300">
          Quantity
        </p>

        <div className="flex w-fit items-center overflow-hidden rounded-xl border border-zinc-700 bg-[#171717]">
          <button
            onClick={decrease}
            className="p-4 transition hover:bg-zinc-800"
          >
            <HiMinus />
          </button>

          <span className="w-16 text-center text-lg font-semibold text-white">
            {quantity}
          </span>

          <button
            onClick={increase}
            className="p-4 transition hover:bg-zinc-800"
          >
            <HiPlus />
          </button>
        </div>

        <p className="mt-2 text-sm text-zinc-500">
          {stock} item(s) available
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onWishlist}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-[#171717] transition hover:border-blue-600"
        >
          <HiOutlineHeart size={22} />
        </button>

        <button
          onClick={() => onAddToCart(quantity)}
          disabled={stock === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-700"
        >
          <FiShoppingCart size={20} />
          Add to Cart
        </button>
      </div>

      {/* Buy Now */}
      <button
        onClick={() => onBuyNow(quantity)}
        disabled={stock === 0}
        className="w-full rounded-xl border border-blue-600 py-4 font-semibold text-blue-500 transition hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:border-zinc-700 disabled:text-zinc-500"
      >
        Buy Now
      </button>
    </div>
  );
}