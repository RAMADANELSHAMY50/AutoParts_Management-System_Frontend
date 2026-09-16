import { useState } from "react";
import {
  Building2,
  CreditCard,
  Wallet,
} from "lucide-react";

const methods = [
  {
    id: "bank",
    value: "نقداً",
    title: "تحويل بنكي",
    icon: Building2,
  },
  {
    id: "apple",
    value: "بطاقة",
    title: "Apple Pay",
    icon: Wallet,
  },
  {
    id: "card",
    value: "بطاقة",
    title: "بطاقة ائتمان",
    icon: CreditCard,
  },
];

export default function PaymentMethods({ onChange }) {
  const [selected, setSelected] = useState("card");

  const handleSelect = (methodId) => {
    setSelected(methodId);

    const method = methods.find(
      (item) => item.id === methodId
    );

    if (onChange) {
      onChange(method.value);
    }

    console.log(
      "PAYMENT METHOD:",
      method.value
    );
  };

  return (
    <div
      dir="rtl"
      className="rounded-2xl border border-zinc-800 bg-[#171717] p-3 sm:p-4 lg:p-6"
    >
      {/* Header */}
      <div className="mb-4 sm:mb-5 lg:mb-6">
        <h2 className="text-lg font-bold text-white sm:text-xl">
          طريقة الدفع
        </h2>

        <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
          اختر طريقة الدفع المناسبة لك
        </p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-2.5 sm:space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected =
            selected === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() =>
                handleSelect(method.id)
              }
              className={`flex w-full items-center justify-between rounded-xl border p-2.5 text-right transition sm:p-3 lg:p-4 ${
                isSelected
                  ? "border-[#0066FF] bg-[#0066FF]/10"
                  : "border-zinc-800 bg-[#1C1C1C] hover:border-zinc-600"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5 sm:gap-3 lg:gap-4">
                {/* Icon */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-10 sm:w-10 lg:h-11 lg:w-11 ${
                    isSelected
                      ? "bg-[#0066FF] text-white"
                      : "bg-[#252525] text-zinc-400"
                  }`}
                >
                  <Icon
                    size={18}
                    className="sm:h-5 sm:w-5"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-white sm:text-sm">
                    {method.title}
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-zinc-500 sm:mt-1 sm:text-xs">
                    {method.value === "نقداً"
                      ? "الدفع عند الاستلام"
                      : "دفع إلكتروني آمن"}
                  </p>
                </div>
              </div>

              {/* Radio */}
              <div
                className={`ml-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border sm:h-5 sm:w-5 ${
                  isSelected
                    ? "border-[#0066FF]"
                    : "border-zinc-600"
                }`}
              >
                {isSelected && (
                  <div className="h-2 w-2 rounded-full bg-[#0066FF] sm:h-2.5 sm:w-2.5" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Payment Content */}
      <div className="mt-4 sm:mt-5 lg:mt-6">
        {/* Bank */}
        {selected === "bank" && (
          <div className="rounded-xl border border-zinc-800 bg-[#1C1C1C] p-3 sm:p-4 lg:p-5">
            <div className="mb-2.5 flex items-center gap-2 sm:mb-3 sm:gap-3">
              <Building2
                className="text-[#0066FF]"
                size={18}
              />

              <h3 className="text-sm font-semibold text-white sm:text-base">
                التحويل البنكي
              </h3>
            </div>

            <p className="text-xs leading-6 text-zinc-400 sm:text-sm">
              سيتم تأكيد الطلب بعد استلام التحويل
              البنكي.
            </p>
          </div>
        )}

        {/* Apple Pay */}
        {selected === "apple" && (
          <div className="rounded-xl border border-zinc-800 bg-[#1C1C1C] p-3 sm:p-4 lg:p-5">
            <div className="mb-2.5 flex items-center gap-2 sm:mb-3 sm:gap-3">
              <Wallet
                className="text-[#0066FF]"
                size={18}
              />

              <h3 className="text-sm font-semibold text-white sm:text-base">
                Apple Pay
              </h3>
            </div>

            <p className="text-xs leading-6 text-zinc-400 sm:text-sm">
              سيتم استخدام Apple Pay لإتمام عملية
              الدفع بشكل آمن.
            </p>
          </div>
        )}

        {/* Card */}
        {selected === "card" && (
          <div className="rounded-xl border border-zinc-800 bg-[#1C1C1C] p-3 sm:p-4 lg:p-5">
            <div className="mb-3 flex items-center gap-2 sm:gap-3">
              <CreditCard
                className="text-[#0066FF]"
                size={18}
              />

              <h3 className="text-sm font-semibold text-white sm:text-base">
                بطاقة ائتمان
              </h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Card Number */}
              <div>
                <label className="mb-1.5 block text-xs text-zinc-400 sm:mb-2 sm:text-sm">
                  رقم البطاقة
                </label>

                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full rounded-lg border border-zinc-700 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none transition focus:border-[#0066FF] sm:px-4 sm:py-3 sm:text-sm"
                />
              </div>

              {/* Card Holder */}
              <div>
                <label className="mb-1.5 block text-xs text-zinc-400 sm:mb-2 sm:text-sm">
                  اسم حامل البطاقة
                </label>

                <input
                  type="text"
                  placeholder="RAMADAN KHALED"
                  className="w-full rounded-lg border border-zinc-700 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none transition focus:border-[#0066FF] sm:px-4 sm:py-3 sm:text-sm"
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                {/* Expiry */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-400 sm:mb-2 sm:text-sm">
                    تاريخ الانتهاء
                  </label>

                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full rounded-lg border border-zinc-700 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none transition focus:border-[#0066FF] sm:px-4 sm:py-3 sm:text-sm"
                  />
                </div>

                {/* CVV */}
                <div>
                  <label className="mb-1.5 block text-xs text-zinc-400 sm:mb-2 sm:text-sm">
                    CVV
                  </label>

                  <input
                    type="password"
                    placeholder="•••"
                    className="w-full rounded-lg border border-zinc-700 bg-[#151515] px-3 py-2.5 text-xs text-white outline-none transition focus:border-[#0066FF] sm:px-4 sm:py-3 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}