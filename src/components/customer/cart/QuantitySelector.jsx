const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  return (
    <div className="flex items-center overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
      {/* Minus */}
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      {/* Quantity */}
      <div className="flex h-12 w-14 items-center justify-center border-x border-zinc-700 text-lg font-semibold text-white">
        {quantity}
      </div>

      {/* Plus */}
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="flex h-12 w-12 items-center justify-center text-xl font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;