import { useState } from "react";
import { Tag } from "lucide-react";

const CouponCard = ({ onApply }) => {
  const [coupon, setCoupon] = useState("");

  const handleSubmit = () => {
    if (!coupon.trim()) return;
    onApply?.(coupon.trim());
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Title */}
      <div className="mb-5 flex items-center justify-end gap-2">
        <h3 className="text-2xl font-semibold text-white">
          كود الخصم
        </h3>

        <Tag className="h-5 w-5 text-[#A8BBFF]" />
      </div>

      {/* Input + Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          تطبيق
        </button>

        <input
          type="text"
          dir="rtl"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="أدخل الكود هنا"
          className="flex-1 rounded-xl border border-zinc-700 bg-[#111111] px-4 py-3 text-right text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default CouponCard;