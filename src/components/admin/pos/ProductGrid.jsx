import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  getProducts,
  addToCart,
}) {
  return (
    <div className="min-w-0 bg-[#111111] p-3 sm:p-4 lg:p-6">
      <ProductCard
        products={products}
        getProducts={getProducts}
        addToCart={addToCart}
      />
    </div>
  );
}