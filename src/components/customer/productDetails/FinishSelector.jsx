export default function FinishSelector({
  finishes = [],
  selectedFinish,
  onChange,
}) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Finish
        </h3>

        <span className="text-sm text-zinc-400">
          {selectedFinish}
        </span>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-3">
        {finishes.map((finish) => (
          <button
            key={finish}
            onClick={() => onChange(finish)}
            className={`rounded-xl border px-5 py-3 text-sm font-medium transition-all duration-200 ${
              selectedFinish === finish
                ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "border-zinc-700 bg-[#171717] text-zinc-300 hover:border-blue-500 hover:text-white"
            }`}
          >
            {finish}
          </button>
        ))}
      </div>
    </div>
  );
}