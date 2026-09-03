import ProductCard from "./ProductCard";

export default function ProductGrid({ products, getProducts ,addToCart }) {
  return (
    <div className="p-6 bg-[#111111]">
      <ProductCard
        products={products}
        getProducts={getProducts}
        addToCart={addToCart}
      />
    </div>
  );
}