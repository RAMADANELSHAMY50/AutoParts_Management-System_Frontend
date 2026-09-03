import { HiCheckCircle } from "react-icons/hi";

export default function Price({
  price,
  oldPrice,
  stock = 0,
  currency = "$",
  taxText = "Taxes included. Shipping calculated at checkout.",
}) {
  const hasDiscount = oldPrice && oldPrice > price;

  const discount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Price */}
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-4xl font-bold text-white">
          {currency}
          {price.toLocaleString()}
        </h2>

        {hasDiscount && (
          <>
            <span className="text-xl text-zinc-500 line-through">
              {currency}
              {oldPrice.toLocaleString()}
            </span>

            <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-red-400">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="flex items-center gap-2">
        <HiCheckCircle className="text-lg text-green-500" />

        <span className="text-sm text-zinc-300">
          {stock > 0
            ? `In Stock (${stock} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Note */}
      <p className="text-sm text-zinc-500">
        {taxText}
      </p>
    </div>
  );
}