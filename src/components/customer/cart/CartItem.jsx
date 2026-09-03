import { Trash2 } from "lucide-react";

const CartItem = ({
  product,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-[#181818] p-5 transition hover:border-blue-500/40">
      {/* Product Image */}
      <div className="w-32 h-32 overflow-hidden rounded-xl bg-zinc-900">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 justify-between px-8">
        <div className="text-right">
          <h3 className="text-2xl font-semibold text-[#B7C6FF]">
            {product.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            SKU: {product.sku}
          </p>

          <button
            onClick={() => onRemove(product.id)}
            className="mt-8 flex items-center gap-2 text-sm text-red-500 transition hover:text-red-400"
          >
            <Trash2 size={16} />
            إزالة
          </button>
        </div>

        {/* Price + Quantity */}
        <div className="flex flex-col items-end justify-between">
          <h2 className="text-4xl font-bold text-white">
            {product.price.toLocaleString()} ر.س
          </h2>

          <div className="flex items-center overflow-hidden rounded-xl bg-zinc-800">
            <button
              onClick={() => onDecrease(product.id)}
              className="px-5 py-3 text-xl text-white transition hover:bg-zinc-700"
            >
              −
            </button>

            <span className="min-w-[60px] text-center text-xl font-semibold text-white">
              {product.quantity}
            </span>

            <button
              onClick={() => onIncrease(product.id)}
              className="px-5 py-3 text-xl text-white transition hover:bg-zinc-700"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;