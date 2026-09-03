import ProductCard from "./ProductCard";

export default function RelatedProducts({
  products = [],
  title = "Related Products",
}) {
  return (
    <section className="mt-16">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-2 text-zinc-400">
            You may also like these performance parts.
          </p>
        </div>

        <button className="rounded-xl border border-zinc-700 px-5 py-2 text-sm text-zinc-300 transition hover:border-blue-600 hover:text-white">
          View All
        </button>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
          <h3 className="text-lg font-semibold text-white">
            No Related Products
          </h3>

          <p className="mt-2 text-zinc-400">
            There are currently no related products available.
          </p>
        </div>
      )}
    </section>
  );
}