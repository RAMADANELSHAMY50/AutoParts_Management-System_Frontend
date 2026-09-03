import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function ProductCard({
  product,
  onAddToCart,
  onWishlist,
}) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#171717] transition duration-300 hover:-translate-y-1 hover:border-blue-600">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => onWishlist?.(product)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-blue-600"
        >
          <FiHeart />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />

          <span className="text-sm text-zinc-300">
            {product.rating}
          </span>

          <span className="text-sm text-zinc-500">
            ({product.reviews})
          </span>
        </div>

        {/* Name */}
        <Link
          to={`/product/${product.id}`}
          className="block text-lg font-semibold text-white transition hover:text-blue-500"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">
            ${product.price}
          </span>

          {product.oldPrice && (
            <span className="text-sm text-zinc-500 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FiShoppingCart />

          Add to Cart
        </button>
      </div>
    </div>
  );
}