import { useState } from "react";

const PriceRange = () => {
  const [price, setPrice] = useState(5000);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Title */}
      <h3 className="mb-6 text-lg font-semibold text-white">
        نطاق السعر
      </h3>

      {/* Current Price */}
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
        <span>100 ر.س</span>
        <span>10,000 ر.س</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="100"
        max="10000"
        step="100"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="
          w-full
          h-2
          cursor-pointer
          appearance-none
          rounded-full
          bg-zinc-700
          accent-indigo-400
        "
      />

      {/* Selected Price */}
      <div className="mt-5 flex justify-center">
        <span className="rounded-lg bg-[#232323] px-4 py-2 text-sm font-medium text-indigo-300">
          {price.toLocaleString()} ر.س
        </span>
      </div>
    </div>
  );
};

export default PriceRange;