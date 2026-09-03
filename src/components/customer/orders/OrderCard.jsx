import {
  TruckIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const OrderCard = ({
  orderNumber,
  date,
  total,
  status,
  products,
  image,
  quantity = 1,
}) => {
  const statusConfig = {
    processing: {
      text: "قيد التنفيذ",
      color: "text-blue-400",
      border: "border-l-4 border-blue-500",
      icon: <ClockIcon className="h-5 w-5" />,
      button: "تتبع الطلب",
    },
    delivered: {
      text: "تم التوصيل",
      color: "text-green-500",
      border: "border-l-4 border-green-500",
      icon: <CheckCircleIcon className="h-5 w-5" />,
      button: "إعادة طلب",
    },
    shipping: {
      text: "جاري الشحن",
      color: "text-yellow-400",
      border: "border-l-4 border-yellow-500",
      icon: <TruckIcon className="h-5 w-5" />,
      button: "تتبع الطلب",
    },
  };

  const current = statusConfig[status];

  return (
    <div
      className={`rounded-2xl bg-[#171717] p-6 shadow-lg ${current.border}`}
    >
      {/* Top */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Details Button */}
        <div className="flex justify-center lg:justify-start">
          <button className="rounded-xl bg-zinc-700 px-8 py-3 text-white transition hover:bg-zinc-600">
            التفاصيل
          </button>
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            className={`rounded-xl border px-8 py-3 font-semibold transition ${
              status === "delivered"
                ? "bg-[#A5B4FC] text-black hover:bg-[#8f9df8]"
                : "border-[#A5B4FC] text-[#A5B4FC] hover:bg-[#A5B4FC] hover:text-black"
            }`}
          >
            {current.button}
          </button>
        </div>

        {/* Total */}
        <div className="text-center">
          <p className="text-sm text-zinc-500">الإجمالي</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {total}
          </h3>
          <span className="text-zinc-400">ر.س</span>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-sm text-zinc-500">الحالة</p>

          <div
            className={`mt-2 flex items-center justify-center gap-2 ${current.color}`}
          >
            {current.icon}
            <span className="font-semibold">{current.text}</span>
          </div>
        </div>

        {/* Order Number */}
        <div className="text-center lg:text-right">
          <p className="text-sm text-zinc-500">رقم الطلب</p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {orderNumber}
          </h3>

          <p className="mt-2 text-zinc-400">{date}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-zinc-800" />

      {/* Products */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          {products}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-700 text-sm text-white">
            {quantity}+
          </div>

          <img
            src={image}
            alt="product"
            className="h-14 w-14 rounded-lg border border-zinc-700 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;