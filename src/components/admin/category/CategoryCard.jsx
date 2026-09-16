export default function CategoryCard({
  category,
}) {
  const products = category?.products || [];

  // ==========================================
  // Inventory Value
  // ==========================================
  const inventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.quantity || 0) *
        Number(product.costPrice || 0),
    0
  );

  // ==========================================
  // Total Quantity
  // ==========================================
  const totalQuantity = products.reduce(
    (total, product) =>
      total + Number(product.quantity || 0),
    0
  );

  // ==========================================
  // Max Stock
  // ==========================================
  const totalMaxStock = products.reduce(
    (total, product) =>
      total + Number(product.maxStock || 0),
    0
  );

  // ==========================================
  // Progress
  // ==========================================
  const progress =
    totalMaxStock > 0
      ? Math.min(
          (totalQuantity / totalMaxStock) * 100,
          100
        )
      : 0;

  // ==========================================
  // Progress Color
  // ==========================================
  const getProgressColor = (value) => {
    if (value === 0) {
      return "bg-red-500";
    }

    if (value < 30) {
      return "bg-red-500";
    }

    if (value < 70) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  // ==========================================
  // Image
  // ==========================================
  const imageUrl = category?.image?.url
    ? category.image.url.startsWith("http")
      ? category.image.url
      : `http://localhost:1337${category.image.url}`
    : "/placeholder.jpg";

  return (
    <div
      className="
        group
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#141414]
        transition-all
        duration-300
        hover:border-white/20
        sm:rounded-3xl
      "
    >
      {/* ==========================================
          Image
      ========================================== */}
      <div
        className="
          relative
          h-40
          overflow-hidden
          sm:h-44
          md:h-48
          lg:h-52
        "
      >
        <img
          src={imageUrl}
          alt={category?.name || "تصنيف"}
          className="
            h-full
            w-full
            object-cover
            transition
            duration-500
            group-hover:scale-105
          "
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder.jpg";
          }}
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* ==========================================
          Content
      ========================================== */}
      <div className="p-3 sm:p-4">
        {/* Category Name */}
        <h2
          className="
            mt-1
            truncate
            text-lg
            font-bold
            text-white
            sm:mt-2
            sm:text-xl
            lg:text-2xl
          "
        >
          {category?.name || "بدون اسم"}
        </h2>

        {/* Products Count */}
        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            gap-2
            text-sm
            text-white
            sm:mt-2.5
            sm:text-base
          "
        >
          <p className="text-gray-300">
            المنتجات
          </p>

          <span className="shrink-0 font-bold">
            {products.length} منتج
          </span>
        </div>

        {/* ==========================================
            Progress
        ========================================== */}
        <div className="mt-4 sm:mt-6">
          <div
            className="
              mb-2
              flex
              justify-between
              text-[11px]
              text-gray-400
              sm:text-xs
            "
          >
            <span>المخزون</span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="
              h-1.5
              w-full
              overflow-hidden
              rounded-full
              bg-white/5
              sm:h-2
            "
          >
            {progress > 0 && (
              <div
                className={`
                  h-full
                  rounded-full
                  transition-all
                  duration-700
                  ${getProgressColor(progress)}
                `}
                style={{
                  width: `${progress}%`,
                }}
              />
            )}
          </div>
        </div>

        {/* ==========================================
            Details Button
        ========================================== */}
        <button
          type="button"
          className="
            mt-4
            w-full
            rounded-xl
            border
            border-white/10
            px-3
            py-2.5
            text-sm
            text-white
            transition
            hover:bg-white/5
            sm:mt-6
            sm:py-3
          "
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}