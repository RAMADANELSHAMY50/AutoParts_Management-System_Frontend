export default function Specifications({ specifications = [] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171717] overflow-hidden">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <h2 className="text-xl font-semibold text-white">
          Product Specifications
        </h2>
      </div>

      {/* Specifications */}
      <div>
        {specifications.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-4 ${
              index !== specifications.length - 1
                ? "border-b border-zinc-800"
                : ""
            }`}
          >
            {/* Label */}
            <p className="font-medium text-zinc-400">
              {item.label}
            </p>

            {/* Value */}
            <p className="text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}