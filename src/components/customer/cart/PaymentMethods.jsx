import {
  CreditCard,
  Wallet,
  Landmark,
  ShieldCheck,
} from "lucide-react";

// const paymentMethods = [
//   {
//     id: 1,
//     title: "بطاقة ائتمانية",
//     icon: CreditCard,
//   },
//   {
//     id: 2,
//     title: "Apple Pay",
//     icon: Wallet,
//   },
//   {
//     id: 3,
//     title: "تحويل بنكي",
//     icon: Landmark,
//   },
// ];

const PaymentMethods = () => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#181818] p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <ShieldCheck className="h-6 w-6 text-green-500" />

        <h3 className="text-xl font-semibold text-white">
          طرق الدفع
        </h3>
      </div>

      {/* Payment Cards */}
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;

          return (
            <button
              key={method.id}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-700 bg-[#111111] p-4 transition-all duration-300 hover:border-blue-500 hover:bg-zinc-900"
            >
              <Icon className="h-6 w-6 text-blue-500" />

              <span className="font-medium text-white">
                {method.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Security Notice */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 text-green-500" />

        <div>
          <h4 className="font-semibold text-green-400">
            دفع آمن
          </h4>

          <p className="mt-1 text-sm text-zinc-400">
            جميع عمليات الدفع مشفرة وآمنة بنسبة 100%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;