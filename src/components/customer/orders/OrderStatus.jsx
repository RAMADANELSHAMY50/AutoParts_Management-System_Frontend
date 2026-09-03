import {
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const statusStyles = {
  pending: {
    text: "قيد التنفيذ",
    icon: ClockIcon,
    bg: "bg-blue-500/10",
    textColor: "text-blue-400",
    border: "border-blue-500/30",
  },

  shipping: {
    text: "جاري الشحن",
    icon: TruckIcon,
    bg: "bg-yellow-500/10",
    textColor: "text-yellow-400",
    border: "border-yellow-500/30",
  },

  delivered: {
    text: "تم التوصيل",
    icon: CheckCircleIcon,
    bg: "bg-green-500/10",
    textColor: "text-green-400",
    border: "border-green-500/30",
  },

  cancelled: {
    text: "ملغي",
    icon: XCircleIcon,
    bg: "bg-red-500/10",
    textColor: "text-red-400",
    border: "border-red-500/30",
  },
};

const OrderStatus = ({ status = "pending" }) => {
  const current = statusStyles[status] || statusStyles.pending;

  const Icon = current.icon;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 ${current.bg} ${current.border}`}
    >
      <Icon className={`h-5 w-5 ${current.textColor}`} />

      <span className={`text-sm font-semibold ${current.textColor}`}>
        {current.text}
      </span>
    </div>
  );
};

export default OrderStatus;