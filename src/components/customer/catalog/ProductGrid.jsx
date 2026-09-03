import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "LED Headlight Kit",
    category: "Lighting",
    price: 249,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600",
  },
  {
    id: 2,
    name: "Performance Brake Pads",
    category: "Brakes",
    price: 179,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
  },
  {
    id: 3,
    name: "Sport Steering Wheel",
    category: "Interior",
    price: 329,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
  },
  {
    id: 4,
    name: "Premium Car Cover",
    category: "Accessories",
    price: 139,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600",
  },
  {
    id: 5,
    name: "Alloy Wheels",
    category: "Wheels",
    price: 899,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 6,
    name: "Bluetooth Multimedia",
    category: "Electronics",
    price: 499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600",
  },
];

const ProductGrid = () => {
  return (
    <section className="flex-1">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          المنتجات
        </h2>

        <span className="text-sm text-zinc-400">
          {products.length} منتج
        </span>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;