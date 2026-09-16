import { useState } from "react";
import { Tag } from "lucide-react";

const CouponCard = ({ onApply }) => {
  const [coupon, setCoupon] = useState("");

  const handleSubmit = () => {
    if (!coupon.trim()) return;
    onApply?.(coupon.trim());
  };

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

      <div
        className="
          mb-4
          flex
          items-center
          justify-end
          gap-2

          sm:mb-5
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-white

            sm:text-xl

            lg:text-2xl
          "
        >
          كود الخصم
        </h3>

        <Tag
          className="
            h-4
            w-4
            text-[#A8BBFF]

            sm:h-5
            sm:w-5
          "
        />
      </div>

      {/* Input + Button */}

      <div className="flex gap-2 sm:gap-3">

        <button
          onClick={handleSubmit}
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition
            hover:bg-blue-700

            sm:rounded-xl
            sm:px-5
            sm:py-3
            sm:text-sm

            lg:px-6
          "
        >
          تطبيق
        </button>

        <input
          type="text"
          dir="rtl"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="أدخل الكود هنا"
          className="
            min-w-0
            flex-1
            rounded-lg
            border border-zinc-700
            bg-[#111111]
            px-3
            py-2.5
            text-xs
            text-white
            placeholder:text-zinc-500
            focus:border-blue-500
            focus:outline-none

            sm:rounded-xl
            sm:px-4
            sm:py-3
            sm:text-sm
          "
        />

      </div>
    </div>
  );
};

export default CouponCard;