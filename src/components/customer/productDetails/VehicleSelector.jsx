export default function VehicleSelector({
  vehicles = [],
  selectedVehicle,
  onChange,
}) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex min-w-0 items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-white sm:text-lg">
          السيارة المتوافقة
        </h3>

        {selectedVehicle && (
          <span className="max-w-[50%] truncate text-[11px] text-zinc-400 sm:text-sm">
            {selectedVehicle}
          </span>
        )}
      </div>

      {/* Select */}
      <select
        value={selectedVehicle}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full min-w-0 rounded-xl border border-zinc-700 bg-[#171717] px-3 py-2.5 text-xs text-white outline-none transition focus:border-blue-600 sm:px-4 sm:py-3 sm:text-sm"
      >
        <option value="" disabled>
          اختر السيارة
        </option>

        {vehicles.map(
          (vehicle, index) => (
            <option
              key={index}
              value={vehicle}
            >
              {vehicle}
            </option>
          )
        )}
      </select>
    </div>
  );
}