import { useState } from "react";
import {
  HiOutlineHeart,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductInfo({
  product,
  onAddToCart,
  onWishlist,
}) {
  const [finish, setFinish] = useState("Glossy");

  return (
    <div className="space-y-6 text-white">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold leading-relaxed">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-3 text-sm">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <span className="text-zinc-400">
            ({product.reviews} مراجعة)
          </span>
        </div>
      </div>

      {/* Price & Stock */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">
          {product.price} ر.س
        </h2>

        <p className="font-medium text-red-400">
          في المخزون ({product.stock} قطع فقط)
        </p>
      </div>

      {/* Description */}
      <p className="leading-8 text-zinc-400">
        {product.description}
      </p>

      {/* Finish */}
      <div>
        <h3 className="mb-3 font-semibold">
          نوع اللمسة النهائية
        </h3>

        <div className="flex gap-3">
          {["Glossy", "Matte"].map((item) => (
            <button
              key={item}
              onClick={() => setFinish(item)}
              className={`rounded-lg border px-5 py-2 transition ${
                finish === item
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-zinc-700 bg-[#171717] text-zinc-300 hover:border-blue-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Compatibility */}
      <div>
        <label className="mb-2 block font-semibold">
          التوافق
        </label>

        <select className="w-full rounded-xl border border-zinc-700 bg-[#171717] px-4 py-3 text-white outline-none focus:border-blue-600">
          <option>Porsche 911 (992) Turbo / S</option>
          <option>BMW M4 Competition</option>
          <option>Mercedes AMG GT</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onWishlist}
          className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-[#171717] transition hover:border-blue-600"
        >
          <HiOutlineHeart size={22} />
        </button>

        <Link to={"/cart"}
          onClick={onAddToCart}
          className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-700"
        >
          <FiShoppingCart />
          أضف إلى السلة
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-800 bg-[#171717] p-4">
          <div className="mb-3 flex items-center gap-2">
            <HiOutlineShieldCheck className="text-xl text-blue-500" />
            <h4 className="font-semibold">ضمان سنتين</h4>
          </div>

          <p className="text-sm text-zinc-400">
            ضمان الجودة والأداء
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#171717] p-4">
          <div className="mb-3 flex items-center gap-2">
            <HiOutlineTruck className="text-xl text-blue-500" />
            <h4 className="font-semibold">شحن سريع</h4>
          </div>

          <p className="text-sm text-zinc-400">
            خلال 3-5 أيام عمل
          </p>
        </div>
      </div>
    </div>
  );
}