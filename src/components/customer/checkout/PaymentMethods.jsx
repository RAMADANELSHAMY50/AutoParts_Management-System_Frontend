// PaymentMethods.jsx

import { useState } from "react";
import { Building2, CreditCard, Wallet } from "lucide-react";

const methods = [
  {
    id: "bank",
    title: "تحويل بنكي",
    icon: Building2,
  },
  {
    id: "apple",
    title: "Apple Pay",
    icon: Wallet,
  },
  {
    id: "card",
    title: "بطاقة ائتمان",
    icon: CreditCard,
  },
];

export default function PaymentMethods() {
  const [selected, setSelected] = useState("card");

  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-end gap-2 mb-8">
        <CreditCard className="w-6 h-6 text-[#B7C9FF]" />
        <h2 className="text-3xl font-bold text-white">
          طريقة الدفع
        </h2>
      </div>

      {/* Payment Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {methods.map((method) => {
          const Icon = method.icon;
          const active = selected === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelected(method.id)}
              className={`group rounded-xl border transition-all duration-300 h-36 flex flex-col items-center justify-center gap-4
              
              ${
                active
                  ? "border-blue-500 bg-[#242833] shadow-lg shadow-blue-500/10"
                  : "border-zinc-700 bg-[#1E1E1E] hover:border-blue-500"
              }`}
            >
              <Icon
                className={`w-9 h-9 ${
                  active
                    ? "text-[#B7C9FF]"
                    : "text-zinc-400 group-hover:text-white"
                }`}
              />

              <span
                className={`text-xl font-semibold ${
                  active
                    ? "text-white"
                    : "text-zinc-300"
                }`}
              >
                {method.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bank Transfer Info */}
      {selected === "bank" && (
        <div className="mt-8 rounded-xl border border-zinc-700 bg-[#1E1E1E] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            معلومات التحويل البنكي
          </h3>

          <div className="space-y-2 text-zinc-300">
            <p>
              اسم البنك:
              <span className="text-white font-medium">
                {" "}
                البنك الأهلي السعودي
              </span>
            </p>

            <p>
              رقم الحساب:
              <span className="text-white font-medium">
                {" "}
                1234567890123456
              </span>
            </p>

            <p>
              الآيبان:
              <span className="text-white font-medium">
                {" "}
                SA00 0000 0000 0000 0000 0000
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Apple Pay */}
      {selected === "apple" && (
        <div className="mt-8 rounded-xl border border-zinc-700 bg-[#1E1E1E] p-6">
          <div className="text-center">
            <Wallet className="mx-auto mb-4 w-12 h-12 text-white" />

            <h3 className="text-xl font-semibold text-white">
              سيتم تحويلك إلى Apple Pay
            </h3>

            <p className="text-zinc-400 mt-2">
              بعد الضغط على تأكيد الدفع سيتم فتح Apple Pay لإتمام
              العملية.
            </p>
          </div>
        </div>
      )}

      {/* Credit Card */}
      {selected === "card" && (
        <div className="mt-8 space-y-5">
          {/* Card Number */}
          <div>
            <label className="block text-sm text-zinc-400 text-right mb-2">
              رقم البطاقة
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="**** **** **** ****"
                className="w-full h-14 rounded-xl bg-[#242424] border border-zinc-700 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />

              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
            </div>
          </div>

          {/* Expiry & CVV */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-zinc-400 text-right mb-2">
                تاريخ الانتهاء
              </label>

              <input
                type="text"
                placeholder="MM / YY"
                className="w-full h-14 rounded-xl bg-[#242424] border border-zinc-700 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 text-right mb-2">
                رمز التحقق (CVV)
              </label>

              <input
                type="password"
                placeholder="***"
                className="w-full h-14 rounded-xl bg-[#242424] border border-zinc-700 px-4 text-white placeholder:text-zinc-500 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}