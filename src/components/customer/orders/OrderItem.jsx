import {
  CubeIcon,
  HashtagIcon,
} from "@heroicons/react/24/outline";

const formatPrice = (price) => {
  return Number(price || 0).toLocaleString("ar-EG");
};

const OrderItem = ({
  image,
  name,
  sku,
  price,
  quantity,
  total,
}) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-2.5 sm:p-3 lg:p-4">
      <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
        {/* Image */}
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-[#0E0E0E] sm:h-16 sm:w-16 lg:h-20 lg:w-20">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <CubeIcon className="h-6 w-6 text-zinc-600 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-xs font-semibold text-white sm:text-sm lg:text-base">
            {name || "منتج غير معروف"}
          </h4>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-500 sm:text-xs">
            <HashtagIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

            <span className="truncate">{sku || "بدون SKU"}</span>
          </div>

          <p className="mt-1.5 text-[11px] text-zinc-400 sm:text-xs lg:text-sm">
            {formatPrice(price)} ر.س
          </p>
        </div>

        {/* Quantity */}
        <div className="hidden text-center sm:block">
          <p className="text-[10px] text-zinc-500 sm:text-xs">
            الكمية
          </p>

          <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
            {quantity}
          </p>
        </div>

        {/* Total */}
        <div className="text-left">
          <p className="text-[10px] text-zinc-500 sm:text-xs">
            الإجمالي
          </p>

          <p className="mt-1 text-xs font-bold text-[#A5B4FC] sm:text-sm lg:text-base">
            {formatPrice(total)} ر.س
          </p>
        </div>
      </div>

      {/* Mobile Quantity */}
      <div className="mt-2.5 flex items-center justify-between border-t border-zinc-800 pt-2.5 sm:hidden">
        <span className="text-[10px] text-zinc-500">
          الكمية
        </span>

        <span className="text-xs font-semibold text-white">
          {quantity}
        </span>
      </div>
    </div>
  );
};

export default OrderItem;