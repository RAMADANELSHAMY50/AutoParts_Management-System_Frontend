import {
  EyeIcon,
  TruckIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const OrderActions = ({
  status = "processing",
  onView,
  onTrack,
  onReorder,
  onCancel,
  reordering = false,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">

      {/* ======================================
          Details
      ====================================== */}

      <button
        type="button"
        onClick={onView}
        className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-[#1B1B1B] px-5 py-3 text-sm font-medium text-white transition hover:border-[#A5B4FC] hover:bg-[#242424]"
      >
        <EyeIcon className="h-5 w-5" />
        التفاصيل
      </button>

      {/* ======================================
          Processing / Shipping
      ====================================== */}

      {(status === "processing" ||
        status === "shipping") && (
        <>
          {/* Track */}

          <button
            type="button"
            onClick={onTrack}
            className="flex items-center gap-2 rounded-xl bg-[#A5B4FC] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#8E9DF7]"
          >
            <TruckIcon className="h-5 w-5" />
            تتبع الطلب
          </button>

          {/* Cancel */}

          {status === "processing" && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 rounded-xl border border-red-500/40 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <XMarkIcon className="h-5 w-5" />
              إلغاء الطلب
            </button>
          )}
        </>
      )}

      {/* ======================================
          Delivered - Reorder
      ====================================== */}

      {status === "delivered" && (
        <button
          type="button"
          onClick={onReorder}
          disabled={reordering}
          className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${
            reordering
              ? "cursor-not-allowed border border-green-400/40 bg-green-500/20 text-green-400"
              : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
          }`}
        >
          {reordering ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-green-400 border-t-transparent" />

              جاري إعادة الطلب...
            </>
          ) : (
            <>
              <ArrowPathIcon className="h-5 w-5" />

              إعادة الطلب
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default OrderActions;