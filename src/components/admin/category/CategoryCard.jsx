export default function CategoryCard({ category }) {
  const inventoryValue = category.products.reduce(
    (total, product) =>
      total + product.quantity * product.costPrice,
    0
  );

  const totalQuantity = category.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalMaxStock = category.products.reduce(
    (total, product) => total + product.maxStock,
    0
  );

  // منع القسمة على صفر
  const progress =
    totalMaxStock > 0
      ? Math.min((totalQuantity / totalMaxStock) * 100, 100)
      : 0;

  const getProgressColor = (progress) => {
    if (progress === 0) {
      return "bg-red-500";
    }

    if (progress < 30) {
      return "bg-red-500";
    }

    if (progress < 70) {
      return "bg-yellow-500";
    }

    return "bg-green-500";
  };

  return (
    <div className="group bg-[#141414] border border-white/10 rounded-3xl overflow-hidden">

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={`http://localhost:1337${category.image.url}`}
          alt={category.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">

        <h2 className="text-white text-2xl font-bold mt-5">
          {category.name}
        </h2>

        <div className="flex items-center justify-between text-white">
          <p className="mt-2.5">
            المنتجات
          </p>

          <span className="font-bold">
            {category.products.length} منتج
          </span>
        </div>

        {/* Progress */}
        <div className="mt-6">

          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>المخزون</span>

            <span>
              {Math.round(progress)}%
            </span>
          </div>

          {/* Background */}
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">

            {/* Progress */}
            {progress > 0 && (
              <div
                className={`
                  h-full
                  rounded-full
                  ${getProgressColor(progress)}
                  transition-all
                  duration-700
                `}
                style={{
                  width: `${progress}%`,
                }}
              />
            )}

          </div>
        </div>

        <button className="mt-6 w-full py-3 rounded-xl border border-white/10 text-white">
          عرض التفاصيل
        </button>

      </div>
    </div>
  );
}