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
  const [paymentMethod, setPaymentMethod] = useState("نقداً");

  const tax = (subtotal - discount) * taxRate;
  const total = subtotal - discount + tax;

  return (
    <div className=" bg-[#1b1b1b] border-t border-zinc-800 p-5 space-y-5">

      {/* Payment Method */}
      <div>
        <h3 className="text-white font-semibold mb-3">
          Payment Method
        </h3>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setPaymentMethod("نقداً")}
            className={`flex items-center justify-center gap-2 h-12 rounded-xl border transition
              ${
                paymentMethod === "نقداً"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-[#252525] border-zinc-700 text-zinc-300 hover:bg-zinc-700"
              }`}
          >
            <MdPayments size={22} />
            Cash
          </button>

          <button
            onClick={() => setPaymentMethod("بطاقة")}
            className={`flex items-center justify-center gap-2 h-12 rounded-xl border transition
              ${
                paymentMethod === "بطاقة"
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-[#252525] border-zinc-700 text-zinc-300 hover:bg-zinc-700"
              }`}
          >
            <MdCreditCard size={22} />
            Card
          </button>

        </div>
      </div>

      {/* Checkout */}
      <button
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
        className="w-full h-14 rounded-xl bg-green-600 hover:bg-green-700 transition flex items-center justify-center gap-2 font-semibold text-lg"
      >
        <MdReceiptLong size={22} />
        Complete Sale
      </button>

    </div>
  );
}