// OrderSummary.jsx

import { ShieldCheck } from "lucide-react";
import OrderItem from "./OrderItem";

const products = [
  {
    id: 1,
    name: "جناح خلفي كربون فايبر",
    quantity: 1,
    price: 1250,
    image: "/images/products/product1.jpg",
  },
  {
    id: 2,
    name: "جنوط رياضية 19 إنش",
    quantity: 4,
    price: 4800,
    image: "/images/products/product2.jpg",
  },
];

export default function OrderSummary() {
  const subtotal = 6050;
  const shipping = 0;
  const tax = 907.5;
  const total = subtotal + shipping + tax;

  return (
    <aside className="w-full rounded-2xl border border-zinc-800 bg-[#171717] p-6 shadow-lg">
      {/* Header */}
      <h2 className="mb-6 text-right text-3xl font-bold text-white">
        ملخص الطلب
      </h2>

      {/* Products */}
      <div className="space-y-5">
        {products.map((product) => (
          <OrderItem key={product.id} product={product} />
        ))}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-zinc-800" />

      {/* Summary */}
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            {subtotal.toLocaleString()} ر.س
          </span>

          <span className="text-zinc-300">المجموع الفرعي</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-green-400">
            {shipping === 0 ? "مجاني" : `${shipping} ر.س`}
          </span>

          <span className="text-zinc-300">رسوم الشحن</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            {tax.toLocaleString()} ر.س
          </span>

          <span className="text-zinc-300">
            ضريبة القيمة المضافة (15%)
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-zinc-800" />

      {/* Total */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-4xl font-bold text-[#B7C9FF]">
          {total.toLocaleString()} ر.س
        </span>

        <span className="text-2xl font-bold text-white">
          الإجمالي النهائي
        </span>
      </div>

      {/* Button */}
      <button className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700">
        <ShieldCheck size={22} />
        تأكيد الدفع
      </button>

      {/* Security */}
      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-zinc-500">
        <ShieldCheck size={16} className="text-green-400" />
        <span>عملية الدفع مشفرة وآمنة تمامًا</span>
      </div>
    </aside>
  );
}