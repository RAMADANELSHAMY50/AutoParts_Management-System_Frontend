import { useState } from "react";

const brands = [
  "Apex Performance",
  "Luxe Drive",
  "Titan Tuning",
  "SpeedTech",
  "RoadMaster",
];

const BrandFilter = () => {
  const [selectedBrand, setSelectedBrand] = useState("Apex Performance");

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Title */}
      <h3 className="mb-6 text-lg font-semibold text-white">
        العلامة التجارية
      </h3>

      {/* Brand List */}
      <div className="space-y-4">
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex cursor-pointer items-center justify-between group"
          >
            <span className="text-sm text-zinc-300 transition group-hover:text-white">
              {brand}
            </span>

            <input
              type="radio"
              name="brand"
              checked={selectedBrand === brand}
              onChange={() => setSelectedBrand(brand)}
              className="h-5 w-5 cursor-pointer accent-indigo-500"
            />
          </label>
        ))}
      </div>

      {/* Selected Brand */}
      <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-3 text-center">
        <p className="text-xs text-zinc-400">العلامة المختارة</p>
        <p className="mt-1 font-medium text-indigo-300">
          {selectedBrand}
        </p>
      </div>
    </div>
  );
};

export default BrandFilter;