import React from "react";
import { MdAddShoppingCart } from "react-icons/md";

const API_URL = "http://localhost:1337";

export default function ProductCard({
  products = [],
  getProducts,
  addToCart,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
      {products.length > 0 ? (
        products.map((product) => {
          const imageUrl = product.image?.url
            ? `${API_URL}${product.image.url}`
            : product.image ||
              "/placeholder.jpg";

          return (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-zinc-800 bg-[#1b1b1b] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 sm:rounded-2xl"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={imageUrl}
                  alt={product.name || "Product"}
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.jpg";
                  }}
                  className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-44 lg:h-48"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                {/* Category */}
                <span className="inline-block max-w-full truncate rounded-full bg-blue-600/20 px-2.5 py-1 text-[10px] font-medium text-blue-400 sm:px-3 sm:text-xs">
                  {product.category?.name ||
                    product.Categories ||
                    "بدون تصنيف"}
                </span>

                {/* Name */}
                <h3 className="mt-2 line-clamp-2 min-h-[44px] text-base font-semibold leading-6 text-white sm:mt-3 sm:text-lg">
                  {product.name}
                </h3>

                {/* Price + Add */}
                <div className="mt-3 flex items-end justify-between gap-2 sm:mt-4">
                  <div className="min-w-0">
                    <p className="text-[10px] text-zinc-500 sm:text-xs">
                      السعر
                    </p>

                    <p className="mt-0.5 truncate text-lg font-bold text-blue-500 sm:text-xl">
                      {Number(
                        product.price || 0
                      ).toFixed(2)}{" "}
                      ر.س
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart(product)
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 active:scale-95 sm:h-11 sm:w-11"
                    aria-label="إضافة إلى السلة"
                  >
                    <MdAddShoppingCart
                      size={20}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="col-span-full flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#151515] p-5 sm:min-h-[260px] sm:rounded-2xl lg:min-h-[300px]">
          <div className="text-center">
            <MdAddShoppingCart
              size={40}
              className="mx-auto mb-3 text-zinc-600 sm:size-[45px]"
            />

            <h3 className="text-base font-semibold text-zinc-300 sm:text-lg">
              لا توجد منتجات
            </h3>

            <p className="mt-2 text-xs text-zinc-500 sm:text-sm">
              ابحث عن منتج لإضافته إلى عملية البيع
            </p>
          </div>
        </div>
      )}
    </div>
  );
}