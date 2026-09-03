export default function VehicleSelector({
  vehicles = [],
  selectedVehicle,
  onChange,
}) {
  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Compatible Vehicle
        </h3>

        {selectedVehicle && (
          <span className="text-sm text-zinc-400">
            {selectedVehicle}
          </span>
        )}
      </div>

      {/* Select */}
      <select
        value={selectedVehicle}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-blue-600"
      >
        <option value="" disabled>
          Select your vehicle
        </option>

        {vehicles.map((vehicle, index) => (
          <option key={index} value={vehicle}>
            {vehicle}
          </option>
        ))}
      </select>
    </div>
  );
}