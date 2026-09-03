import {
  EyeIcon,
  TruckIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const OrderActions = ({
  status = "pending",
  onView,
  onTrack,
  onReorder,
  onCancel,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {/* View Details */}
      <button
        onClick={onView}
        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-[#1B1B1B] px-5 py-3 text-sm font-medium text-white transition hover:border-[#A5B4FC] hover:bg-[#242424]"
      >
        <EyeIcon className="h-5 w-5" />
        التفاصيل
      </button>

      {/* Pending / Shipping */}
      {(status === "pending" || status === "shipping") && (
        <>
          <button
            onClick={onTrack}
            className="flex items-center gap-2 rounded-xl bg-[#A5B4FC] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#8E9DF7]"
          >
            <TruckIcon className="h-5 w-5" />
            تتبع الطلب
          </button>

          <button
            onClick={onCancel}
            className="flex items-center gap-2 rounded-xl border border-red-500/40 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <XMarkIcon className="h-5 w-5" />
            إلغاء الطلب
          </button>
        </>
      )}

      {/* Delivered */}
      {status === "delivered" && (
        <button
          onClick={onReorder}
          className="flex items-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
        >
          <ArrowPathIcon className="h-5 w-5" />
          إعادة الطلب
        </button>
      )}
    </div>
  );
};

export default OrderActions;