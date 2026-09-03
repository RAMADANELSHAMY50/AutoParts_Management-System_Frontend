import { CreditCard, Lock } from "lucide-react";

export default function CreditCardForm() {
  return (
    <div className="mt-8 rounded-2xl border border-zinc-800 bg-[#171717] p-6">
      <div className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="mb-2 block text-right text-sm text-zinc-400">
            رقم البطاقة
          </label>

          <div className="relative">
            <CreditCard className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

            <input
              type="text"
              placeholder="**** **** **** ****"
              maxLength={19}
              className="h-14 w-full rounded-xl border border-zinc-700 bg-[#242424] px-4 pl-12 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
            />
          </div>
        </div>

        {/* Card Holder */}
        <div>
          <label className="mb-2 block text-right text-sm text-zinc-400">
            اسم حامل البطاقة
          </label>

          <input
            type="text"
            placeholder="أدخل اسم حامل البطاقة"
            className="h-14 w-full rounded-xl border border-zinc-700 bg-[#242424] px-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Expiry */}
          <div>
            <label className="mb-2 block text-right text-sm text-zinc-400">
              تاريخ الانتهاء
            </label>

            <input
              type="text"
              placeholder="MM / YY"
              maxLength={5}
              className="h-14 w-full rounded-xl border border-zinc-700 bg-[#242424] px-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
            />
          </div>

          {/* CVV */}
          <div>
            <label className="mb-2 block text-right text-sm text-zinc-400">
              رمز التحقق (CVV)
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

              <input
                type="password"
                placeholder="***"
                maxLength={3}
                className="h-14 w-full rounded-xl border border-zinc-700 bg-[#242424] px-4 pl-12 text-white placeholder:text-zinc-500 outline-none transition focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-[#1F1F1F] py-4 text-sm text-zinc-400">
          <Lock className="h-4 w-4 text-green-400" />
          <span>جميع بيانات الدفع مشفرة وآمنة.</span>
        </div>
      </div>
    </div>
  );
}