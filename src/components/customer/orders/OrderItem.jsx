const OrderItem = ({
  image,
  name,
  sku,
  price,
  quantity,
}) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-[#1B1B1B] p-4 transition hover:border-[#A5B4FC]/40">
      {/* Product */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-16 w-16 rounded-lg border border-zinc-700 object-cover"
        />

        <div>
          <h4 className="text-base font-semibold text-white">
            {name}
          </h4>

          {sku && (
            <p className="mt-1 text-sm text-zinc-500">
              SKU: {sku}
            </p>
          )}
        </div>
      </div>

      {/* Price & Quantity */}
      <div className="flex items-center gap-10">
        <div className="text-center">
          <p className="text-xs text-zinc-500">
            السعر
          </p>

          <h5 className="mt-1 text-lg font-bold text-white">
            {price}
          </h5>
        </div>

        <div className="text-center">
          <p className="text-xs text-zinc-500">
            الكمية
          </p>

          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700 text-sm font-semibold text-white">
            {quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;