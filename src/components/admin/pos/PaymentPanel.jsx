import React, { useState } from "react";
import {
  MdPayments,
  MdCreditCard,
  MdReceiptLong,
} from "react-icons/md";

export default function PaymentPanel({
  subtotal = 0,
  discount = 0,
  taxRate = 0.15,
  onCheckout,
}) {
  const [paymentMethod, setPaymentMethod] =
    useState("نقداً");

  const tax = (subtotal - discount) * taxRate;

  const total =
    subtotal -
    discount +
    tax;

  return (
    <div className="w-full border-t border-zinc-800 bg-[#1b1b1b] p-3 sm:p-4 lg:p-5">
      {/* ==========================================
          Payment Method
      ========================================== */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-white sm:text-base">
          طريقة الدفع
        </h3>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Cash */}
          <button
            type="button"
            onClick={() =>
              setPaymentMethod("نقداً")
            }
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-xs font-semibold transition sm:min-h-12 sm:text-sm ${
              paymentMethod === "نقداً"
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-zinc-700 bg-[#242424] text-zinc-400 hover:border-zinc-600 hover:text-white"
            }`}
          >
            <MdPayments
              size={20}
            />

            <span>نقداً</span>
          </button>

          {/* Card */}
          <button
            type="button"
            onClick={() =>
              setPaymentMethod("بطاقة")
            }
            className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-2 py-2.5 text-xs font-semibold transition sm:min-h-12 sm:text-sm ${
              paymentMethod === "بطاقة"
                ? "border-blue-500 bg-blue-600 text-white"
                : "border-zinc-700 bg-[#242424] text-zinc-400 hover:border-zinc-600 hover:text-white"
            }`}
          >
            <MdCreditCard
              size={20}
            />

            <span>بطاقة</span>
          </button>
        </div>
      </div>

      {/* ==========================================
          Checkout
      ========================================== */}
      <button
        type="button"
        onClick={() =>
          onCheckout &&
          onCheckout({
            paymentMethod,
            subtotal,
            discount,
            tax,
            total,
          })
        }
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-3 text-base font-semibold text-white transition hover:bg-green-700 active:scale-[0.99] sm:mt-5 sm:h-14 sm:text-lg"
      >
        <MdReceiptLong size={21} />

        <span>إتمام البيع</span>
      </button>
    </div>
  );
}