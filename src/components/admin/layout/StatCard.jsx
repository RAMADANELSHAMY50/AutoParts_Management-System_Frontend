

export default function StatCard({ status = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {status.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={`
            bg-[#181818]
            border
            border-gray-800
            rounded-2xl
            p-6
            transition-all
            duration-300
            ${
              item.onClick
                ? "cursor-pointer hover:border-blue-500 hover:bg-[#202020]"
                : "hover:border-blue-500"
            }
          `}
        >
          <div
            className={`
              w-16
              h-16
              flex
              items-center
              justify-center
              text-4xl
              rounded-lg
              ${item.color || ""}
              ${item.bg || ""}
            `}
          >
            {item.icons}
          </div>

          <p className="text-gray-400 mt-4">
            {item.Name}
          </p>

          {item.value !== undefined && (
            <h2 className="text-2xl font-bold text-white">
              {item.value}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
}
