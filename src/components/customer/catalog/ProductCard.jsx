import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#181818] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Favorite */}
        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-indigo-600">
          <FiHeart size={18} />
        </button>

        {/* Category */}
        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-lg font-semibold text-white">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <FiStar className="fill-yellow-400 text-yellow-400" />

          <span className="text-sm font-medium text-white">
            {product.rating}
          </span>

          <span className="text-sm text-zinc-500">(120)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500">Price</p>

            <h4 className="text-2xl font-bold text-indigo-400">
              ${product.price}
            </h4>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">
            Buy Now
          </button>

          <button className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-700 text-zinc-300 transition hover:border-indigo-500 hover:bg-indigo-600 hover:text-white">
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;