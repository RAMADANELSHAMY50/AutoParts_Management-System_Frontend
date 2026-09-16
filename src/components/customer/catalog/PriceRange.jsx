import { useEffect, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 10000;

const PriceRange = ({
  maxPrice,
  setMaxPrice,
}) => {
  const [value, setValue] =
    useState(
      maxPrice ?? MAX_PRICE
    );

  // ==========================================
  // Sync
  // ==========================================
  useEffect(() => {
    setValue(
      maxPrice ?? MAX_PRICE
    );
  }, [maxPrice]);

  // ==========================================
  // Change
  // ==========================================
  const handleChange = (e) => {
    const newValue = Number(
      e.target.value
    );

    setValue(newValue);
    setMaxPrice(newValue);
  };

  // ==========================================
  // Reset
  // ==========================================
  const handleReset = () => {
    setValue(MAX_PRICE);
    setMaxPrice(MAX_PRICE);
  };

  return (
    <div
      className="
        rounded-xl
        border
        border-zinc-800
        bg-[#181818]
        p-3

        sm:rounded-2xl
        sm:p-5
      "
    >
      {/* Header */}
      <div
        className="
          mb-3
          flex
          items-center
          justify-between

          sm:mb-5
        "
      >
        <h3 className="text-sm font-bold text-white sm:text-base">
          نطاق السعر
        </h3>

        <button
          type="button"
          onClick={handleReset}
          className="text-[10px] text-blue-400 transition hover:text-blue-300 sm:text-xs"
        >
          إعادة تعيين
        </button>
      </div>

      {/* Current Price */}
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <span className="text-[10px] text-zinc-500 sm:text-xs">
          السعر حتى
        </span>

        <span className="text-xs font-semibold text-blue-400 sm:text-sm">
          {value.toLocaleString()} ر.س
        </span>
      </div>

      {/* Range */}
      <input
        type="range"
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={100}
        value={value}
        onChange={handleChange}
        className="
          h-1.5
          w-full
          cursor-pointer
          appearance-none
          rounded-lg
          bg-zinc-700
          accent-blue-600

          sm:h-2
        "
      />

      {/* Min / Max */}
      <div
        className="
          mt-2
          flex
          items-center
          justify-between
          text-[10px]
          text-zinc-500

          sm:mt-3
          sm:text-xs
        "
      >
        <span>
          {MIN_PRICE.toLocaleString()} ر.س
        </span>

        <span>
          {MAX_PRICE.toLocaleString()} ر.س
        </span>
      </div>
    </div>
  );
};

export default PriceRange;