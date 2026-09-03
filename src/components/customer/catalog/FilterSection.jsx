import { useState } from "react";

const categories = [
  "إضاءة داخلية",
  "أنظمة صوتية",
  "جنوط رياضية",
  "معدات تقنية",
];

const FilterSection = () => {
  const [selected, setSelected] = useState(["أنظمة صوتية"]);

  const handleToggle = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      setSelected([...selected, category]);
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Title */}
      <h3 className="mb-6 text-lg font-semibold text-white">
        الفئات
      </h3>

      {/* Categories */}
      <div className="space-y-4">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center justify-between cursor-pointer group"
          >
            <span className="text-sm text-zinc-300 group-hover:text-white transition">
              {category}
            </span>

            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => handleToggle(category)}
              className="h-5 w-5 rounded border-zinc-600 bg-transparent accent-indigo-400"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection;