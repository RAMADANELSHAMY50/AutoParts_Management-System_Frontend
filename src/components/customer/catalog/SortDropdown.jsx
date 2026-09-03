import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const sortOptions = [
  "الأحدث أولاً",
  "الأقدم أولاً",
  "السعر: من الأقل للأعلى",
  "السعر: من الأعلى للأقل",
  "الأكثر مبيعًا",
  "الأعلى تقييمًا",
];

const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-right">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-[#1A1A1A] px-4 py-2 text-sm text-white hover:border-[#A5B4FC] transition"
      >
        <span>{value}</span>
        <FiChevronDown
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-700 bg-[#181818] shadow-2xl z-50">
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-right text-sm transition
                ${
                  value === option
                    ? "bg-[#A5B4FC] text-black font-semibold"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;