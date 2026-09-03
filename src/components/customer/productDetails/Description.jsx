import {
  HiOutlineCheckCircle,
  HiOutlineSparkles,
} from "react-icons/hi";

export default function Description({
  title = "Product Overview",
  description,
  features = [],
  packageIncludes = [],
}) {
  return (
    <div className="space-y-8 rounded-2xl border border-zinc-800 bg-[#171717] p-6">
      {/* Overview */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <HiOutlineSparkles className="text-2xl text-blue-500" />

          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>
        </div>

        <p className="leading-8 text-zinc-400">
          {description}
        </p>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Key Features
          </h3>

          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <HiOutlineCheckCircle className="mt-1 text-xl text-blue-500" />

                <p className="text-zinc-300">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Package */}
      {packageIncludes.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Package Includes
          </h3>

          <ul className="space-y-3">
            {packageIncludes.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-zinc-300"
              >
                <HiOutlineCheckCircle className="mt-1 text-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}