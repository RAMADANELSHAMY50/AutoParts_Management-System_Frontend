import {
  ClockIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const statusStyles = {
  processing: {
    label: "قيد التنفيذ",
    icon: ClockIcon,
    className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  },
  shipping: {
    label: "جاري الشحن",
    icon: TruckIcon,
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  delivered: {
    label: "تم التوصيل",
    icon: CheckCircleIcon,
    className: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  cancelled: {
    label: "ملغي",
    icon: XCircleIcon,
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

const OrderStatus = ({ status }) => {
  const config = statusStyles[status] || statusStyles.processing;

  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${config.className}`}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

      <span>{config.label}</span>
    </div>
  );
};

export default OrderStatus;