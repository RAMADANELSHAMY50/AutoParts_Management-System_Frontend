import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductCard({ products = [], getProducts ,addToCart }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#1b1b1b] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
          >
            {/* Product Image */}
            <div className="overflow-hidden">
              <img
                src={`http://localhost:1337${product.image?.url}`}
                alt={product.name || "Product"}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Category */}
              <span className="inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-400">
                {product.category?.name || "بدون تصنيف"}
              </span>

              {/* Product Name */}
              <h3 className="mt-3 line-clamp-2 h-12 text-lg font-semibold text-white">
                {product.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-500">
                    Price
                  </p>

                  <p className="text-xl font-bold text-blue-500">
                    {product.price} ر.س
                  </p>
                </div>

                {/* Add To Cart */}
                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 transition hover:bg-blue-700 active:scale-95"
                  onClick={() => addToCart(product)}
                >
                  <MdAddShoppingCart
                    size={22}
                    className="text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-[#151515]">
          <div className="text-center">
            <MdAddShoppingCart
              size={45}
              className="mx-auto mb-3 text-zinc-600"
            />

            <h3 className="text-lg font-semibold text-zinc-300">
              لا توجد منتجات
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              ابحث عن منتج لإضافته إلى عملية البيع
            </p>
          </div>
        </div>
      )}
    </div>
  );
}