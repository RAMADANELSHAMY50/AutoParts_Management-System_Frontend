import React from "react";
import {
  MdAdd,
  MdRemove,
  MdDeleteOutline,
} from "react-icons/md";

export default function CartPanel({
  cartItems = [],
  increaseQty,
  decreaseQty,
  removeItem,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  const tax = subtotal * 0.15;
  const discount = 0;
  const total = subtotal + tax;

  return (
    <div className="flex w-full flex-col bg-[#181818]">
      {/* ==========================================
          Header
      ========================================== */}
      <div className="border-b border-zinc-800 p-3 sm:p-4 lg:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white sm:text-xl">
              سلة المشتريات
            </h2>

            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              {cartItems.length} منتج
            </p>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-500 sm:h-10 sm:w-10">
            🛒
          </div>
        </div>
      </div>

      {/* ==========================================
          Cart Items
          
          Mobile:
          Normal page height

          Desktop:
          Can scroll when there are many items
      ========================================== */}
      <div className="space-y-3 p-3 sm:space-y-4 sm:p-4 lg:max-h-[calc(100vh-380px)] lg:overflow-y-auto lg:p-5">
        {cartItems.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-[#202020] p-5 text-center sm:min-h-[220px]">
            <div>
              <div className="mb-3 text-4xl opacity-40">
                🛒
              </div>

              <p className="text-sm text-zinc-500 sm:text-base">
                السلة فارغة
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                اختر منتجًا لإضافته إلى السلة
              </p>
            </div>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-2.5 rounded-xl border border-zinc-800 bg-[#222222] p-2.5 transition hover:border-zinc-700 sm:gap-3 sm:p-3"
            >
              {/* Image */}
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.name}
                className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
              />

              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 text-sm font-medium leading-5 text-white sm:text-base">
                  {item.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-blue-400">
                  {Number(item.price || 0).toFixed(2)} ر.س
                </p>

                {/* Quantity */}
                <div className="mt-2.5 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      decreaseQty(item.id)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2d2d2d] text-white transition hover:bg-zinc-700 sm:h-8 sm:w-8"
                  >
                    <MdRemove size={17} />
                  </button>

                  <span className="w-7 text-center text-sm font-semibold text-white sm:w-8">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQty(item.id)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 sm:h-8 sm:w-8"
                  >
                    <MdAdd size={17} />
                  </button>
                </div>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() =>
                  removeItem(item.id)
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center self-start rounded-lg text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* ==========================================
          Summary
      ========================================== */}
      <div className="border-t border-zinc-800 p-3 sm:p-4 lg:p-5">
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>المجموع الفرعي</span>
            <span>
              {subtotal.toFixed(2)} ر.س
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>الضريبة (15%)</span>
            <span>
              {tax.toFixed(2)} ر.س
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>الخصم</span>
            <span>
              -{discount.toFixed(2)} ر.س
            </span>
          </div>

          <div className="my-2 border-t border-zinc-800 sm:my-3" />

          <div className="flex items-center justify-between text-base font-bold text-white sm:text-lg">
            <span>الإجمالي</span>

            <span className="text-blue-500">
              {total.toFixed(2)} ر.س
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}