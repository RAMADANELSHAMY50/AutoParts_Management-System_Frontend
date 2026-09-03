import {
  CreditCard,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const OrderSummary = ({
  subtotal = 16450,
  tax = 2467.5,
  shipping = 0,
  total = 18917.5,
  onCheckout,
}) => {
  const formatPrice = (price) =>
    `${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ر.س`;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Title */}
      <h2 className="mb-8 text-right text-2xl font-bold text-white">
        ملخص الطلب
      </h2>

      {/* Summary */}
      <div className="space-y-5 text-right">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            {formatPrice(subtotal)}
          </span>

          <span className="text-zinc-300">
            المجموع الفرعي
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-400">
            {formatPrice(tax)}
          </span>

          <span className="text-zinc-300">
            ضريبة القيمة المضافة (15%)
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-semibold text-green-500">
            {shipping === 0
              ? "مجاني"
              : formatPrice(shipping)}
          </span>

          <span className="text-zinc-300">
            الشحن
          </span>
        </div>

        <hr className="border-zinc-800" />

        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-[#B7C6FF]">
            {formatPrice(total)}
          </span>

          <span className="text-2xl font-bold text-white">
            الإجمالي
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link to={"/checkout"}
        onClick={onCheckout}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        <CreditCard size={22} />
        إتمام عملية الشراء
      </Link>

      {/* Payment Methods */}
      <div className="mt-8 flex items-center justify-center gap-8 border-t border-zinc-800 pt-6">
        <CreditCard
          size={28}
          className="text-zinc-400"
        />

        <Landmark
          size={28}
          className="text-zinc-400"
        />

        <ShieldCheck
          size={28}
          className="text-zinc-400"
        />
      </div>
    </div>
  );
};

export default OrderSummary;