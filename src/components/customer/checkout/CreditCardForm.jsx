import { CreditCard, Lock } from "lucide-react";

export default function CreditCardForm() {
  return (
    <div className="mt-5 rounded-2xl border border-zinc-800 bg-[#171717] p-3 sm:mt-6 sm:p-4 lg:mt-8 lg:p-6">
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        {/* Card Number */}
        <div>
          <label className="mb-1.5 block text-right text-xs text-zinc-400 sm:mb-2 sm:text-sm">
            رقم البطاقة
          </label>

          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 sm:left-4 sm:h-5 sm:w-5" />

            <input
              type="text"
              placeholder="**** **** **** ****"
              maxLength={19}
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 pl-10 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:pl-12 sm:text-sm"
            />
          </div>
        </div>

        {/* Card Holder */}
        <div>
          <label className="mb-1.5 block text-right text-xs text-zinc-400 sm:mb-2 sm:text-sm">
            اسم حامل البطاقة
          </label>

          <input
            type="text"
            placeholder="أدخل اسم حامل البطاقة"
            className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {/* Expiry */}
          <div>
            <label className="mb-1.5 block text-right text-xs text-zinc-400 sm:mb-2 sm:text-sm">
              تاريخ الانتهاء
            </label>

            <input
              type="text"
              placeholder="MM / YY"
              maxLength={5}
              className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:text-sm"
            />
          </div>

          {/* CVV */}
          <div>
            <label className="mb-1.5 block text-right text-xs text-zinc-400 sm:mb-2 sm:text-sm">
              رمز التحقق (CVV)
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500 sm:left-4 sm:h-5 sm:w-5" />

              <input
                type="password"
                placeholder="***"
                maxLength={3}
                className="h-12 w-full rounded-xl border border-zinc-700 bg-[#242424] px-3 pl-10 text-xs text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500 sm:h-14 sm:px-4 sm:pl-12 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-[#1F1F1F] px-2 py-3 text-[10px] text-zinc-400 sm:gap-2 sm:py-4 sm:text-sm">
          <Lock className="h-3.5 w-3.5 shrink-0 text-green-400 sm:h-4 sm:w-4" />

          <span>جميع بيانات الدفع مشفرة وآمنة.</span>
        </div>
      </div>
    </div>
  );
}