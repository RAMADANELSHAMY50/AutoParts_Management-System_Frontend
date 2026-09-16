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

const SortDropdown = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-right sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-2
          rounded-lg
          border
          border-zinc-700
          bg-[#1A1A1A]
          px-3
          py-2
          text-xs
          text-white
          transition
          hover:border-[#A5B4FC]

          sm:w-auto
          sm:rounded-xl
          sm:px-4
          sm:py-2
          sm:text-sm
        "
      >
        <span className="truncate">
          {value}
        </span>

        <FiChevronDown
          className={`
            shrink-0
            transition-transform
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            z-50
            mt-2
            w-full
            overflow-hidden
            rounded-lg
            border
            border-zinc-700
            bg-[#181818]
            shadow-2xl

            sm:w-60
            sm:rounded-xl
          "
        >
          {sortOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                handleSelect(option)
              }
              className={`
                w-full
                px-3
                py-2.5
                text-right
                text-xs
                transition

                sm:px-4
                sm:py-3
                sm:text-sm

                ${
                  value === option
                    ? "bg-[#A5B4FC] font-semibold text-black"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }
              `}
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