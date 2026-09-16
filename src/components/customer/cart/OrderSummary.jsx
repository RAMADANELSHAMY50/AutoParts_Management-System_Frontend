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
    <div
      className="
        rounded-xl
        border border-zinc-800
        bg-[#181818]
        p-4

        sm:rounded-2xl
        sm:p-5

        lg:p-6
      "
    >

      {/* Title */}

      <h2
        className="
          mb-6
          text-right
          text-xl
          font-bold
          text-white

          sm:mb-7
          sm:text-2xl

          lg:mb-8
        "
      >
        ملخص الطلب
      </h2>

      {/* Summary */}

      <div
        className="
          space-y-4
          text-right

          sm:space-y-5
        "
      >

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-zinc-400 sm:text-sm">
            {formatPrice(subtotal)}
          </span>

          <span className="text-xs text-zinc-300 sm:text-sm">
            المجموع الفرعي
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-zinc-400 sm:text-sm">
            {formatPrice(tax)}
          </span>

          <span className="text-xs text-zinc-300 sm:text-sm">
            ضريبة القيمة المضافة (15%)
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-green-500 sm:text-sm">
            {shipping === 0
              ? "مجاني"
              : formatPrice(shipping)}
          </span>

          <span className="text-xs text-zinc-300 sm:text-sm">
            الشحن
          </span>
        </div>

        <hr className="border-zinc-800" />

        <div className="flex items-center justify-between gap-3">

          <span
            className="
              text-2xl
              font-bold
              text-[#B7C6FF]

              sm:text-3xl

              lg:text-4xl
            "
          >
            {formatPrice(total)}
          </span>

          <span
            className="
              text-lg
              font-bold
              text-white

              sm:text-xl

              lg:text-2xl
            "
          >
            الإجمالي
          </span>

        </div>

      </div>

      {/* Checkout Button */}

      <Link
        to="/checkout"
        onClick={onCheckout}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-blue-600
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700

          sm:mt-7
          sm:rounded-xl
          sm:px-5
          sm:py-3.5
          sm:text-base

          lg:mt-8
          lg:px-6
          lg:py-4
          lg:text-lg
        "
      >
        <CreditCard
          size={18}
          className="sm:h-5 sm:w-5 lg:h-[22px] lg:w-[22px]"
        />

        إتمام عملية الشراء
      </Link>

      {/* Payment Methods */}

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-5
          border-t
          border-zinc-800
          pt-5

          sm:mt-7
          sm:gap-7
          sm:pt-6

          lg:mt-8
          lg:gap-8
        "
      >
        <CreditCard
          size={22}
          className="text-zinc-400 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
        />

        <Landmark
          size={22}
          className="text-zinc-400 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
        />

        <ShieldCheck
          size={22}
          className="text-zinc-400 sm:h-6 sm:w-6 lg:h-7 lg:w-7"
        />
      </div>

    </div>
  );
};

export default OrderSummary;