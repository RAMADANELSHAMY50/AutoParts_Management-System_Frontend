
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductInfo({
  product,
  onWishlist,
}) {
  const navigate = useNavigate();

  const price = Number(
    product?.salePrice ||
    product?.price ||
    0
  );

  const stock = Number(
    product?.stock || 0
  );

  const addToCart = () => {
    const existingCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingProduct =
      existingCart.find(
        (item) => item.id === product.id
      );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map(
        (item) =>
          item.id === product.id
            ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
            : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
          price,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    navigate("/cart");
  };

  return (
    <div className="space-y-4 sm:space-y-6 text-white">

      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed break-words">
          {product?.name}
        </h1>

        <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            ))}
          </div>

          <span className="text-zinc-400">
            ({product?.reviews || 0} مراجعة)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {price.toLocaleString()} ر.س
          </h2>

          {product?.oldPrice && (
            <span className="text-sm sm:text-lg text-zinc-500 line-through">
              {Number(product.oldPrice).toLocaleString()} ر.س
            </span>
          )}
        </div>

        <p
          className={
            stock > 0
              ? "text-sm sm:text-base font-medium text-green-400"
              : "text-sm sm:text-base font-medium text-red-400"
          }
        >
          {stock > 0
            ? `متوفر في المخزون (${stock} قطع)`
            : "نفد المخزون"}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base leading-7 sm:leading-8 text-zinc-400">
        {product?.description || "لا يوجد وصف متاح لهذا المنتج."}
      </p>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onWishlist?.(product)}
          className="flex h-11 w-11 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-lg sm:rounded-xl border border-zinc-700 bg-[#171717] transition hover:border-blue-600"
        >
          <HiOutlineHeart className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
        </button>

        <button
          type="button"
          onClick={addToCart}
          disabled={stock <= 0}
          className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-blue-600 px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-700"
        >
          <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />

          <span className="truncate">
            {stock > 0 ? "أضف إلى السلة" : "غير متوفر"}
          </span>
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-2 sm:gap-4">

        <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:p-4">
          <div className="mb-2 sm:mb-3 flex items-center gap-2">
            <HiOutlineShieldCheck className="text-lg sm:text-xl text-blue-500" />

            <h4 className="text-sm sm:text-base font-semibold">
              ضمان سنتين
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400">
            ضمان الجودة والأداء
          </p>
        </div>

        <div className="rounded-lg sm:rounded-xl border border-zinc-800 bg-[#171717] p-3 sm:p-4">
          <div className="mb-2 sm:mb-3 flex items-center gap-2">
            <HiOutlineTruck className="text-lg sm:text-xl text-blue-500" />

            <h4 className="text-sm sm:text-base font-semibold">
              شحن سريع
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400">
            خلال 3-5 أيام عمل
          </p>
        </div>

      </div>
    </div>
  );
}

