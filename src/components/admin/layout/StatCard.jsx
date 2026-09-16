export default function StatCard({ status = [] }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-3
        sm:gap-4
        lg:gap-6
      "
    >
      {status.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={`
            bg-[#181818]
            border
            border-gray-800
            rounded-xl
            sm:rounded-2xl
            p-4
            sm:p-5
            lg:p-6
            min-w-0
            transition-all
            duration-300
            ${
              item.onClick
                ? "cursor-pointer hover:border-blue-500 hover:bg-[#202020]"
                : "hover:border-blue-500"
            }
          `}
        >
          {/* Icon */}
          <div
            className={`
              w-12
              h-12
              sm:w-14
              sm:h-14
              lg:w-16
              lg:h-16
              flex
              items-center
              justify-center
              text-2xl
              sm:text-3xl
              lg:text-4xl
              rounded-lg
              ${item.color || ""}
              ${item.bg || ""}
            `}
          >
            {item.icons}
          </div>

          {/* Title */}
          <p
            className="
              mt-3
              sm:mt-4
              text-xs
              sm:text-sm
              lg:text-base
              leading-5
              text-gray-400
            "
          >
            {item.Name}
          </p>

          {/* Value */}
          {item.value !== undefined && (
            <h2
              className="
                mt-1
                text-xl
                sm:text-2xl
                lg:text-2xl
                font-bold
                text-white
                truncate
              "
            >
              {item.value}
            </h2>
          )}
        </div>
      ))}
    </div>
  );
}