import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

export default function RelatedProducts({
  products = [],
  title = "منتجات ذات صلة",
}) {
  return (
    <section className="mt-10 sm:mt-12 lg:mt-16">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 min-[500px]:flex-row min-[500px]:items-center min-[500px]:justify-between sm:mb-8">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-bold text-white sm:text-2xl lg:text-3xl">
            {title}
          </h2>

          <p className="mt-1.5 text-xs leading-5 text-zinc-400 sm:mt-2 sm:text-sm">
            قد تعجبك هذه المنتجات أيضًا.
          </p>
        </div>

        <Link
          to="/catalog"
          className="inline-flex w-fit shrink-0 items-center justify-center rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:border-blue-600 hover:text-white sm:rounded-xl sm:px-5 sm:py-2 sm:text-sm"
        >
          عرض الكل
        </Link>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-zinc-700 px-4 py-10 text-center sm:rounded-2xl sm:py-16">
          <h3 className="text-base font-semibold text-white sm:text-lg">
            لا توجد منتجات ذات صلة
          </h3>

          <p className="mt-2 text-xs leading-5 text-zinc-400 sm:text-sm sm:leading-6">
            لا توجد منتجات مرتبطة متاحة حاليًا.
          </p>
        </div>
      )}
    </section>
  );
}