import {
  TruckIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const DeliveryCard = ({
  order,
  address = "غير محدد",
  company = "غير محدد",
  trackingNumber = "غير متوفر",
  estimatedDate = "غير محدد",
  estimatedTime = "غير محدد",
}) => {
  const navigate = useNavigate();

  const handleTrackShipment = () => {
    const orderId = order?.documentId || order?.id;

    if (!orderId) return;

    navigate(`/myorder/${orderId}`);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-3 shadow-lg sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2 sm:mb-5 sm:gap-3 lg:mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#A5B4FC]/10 sm:h-10 sm:w-10 lg:h-11 lg:w-11">
          <TruckIcon className="h-5 w-5 text-[#A5B4FC] sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
        </div>

        <div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            معلومات التوصيل
          </h3>

          <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-xs lg:text-sm">
            تفاصيل شحن الطلب
          </p>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="space-y-3 sm:space-y-4">
        {/* Company */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <TruckIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 sm:h-5 sm:w-5" />

          <div className="min-w-0">
            <p className="text-[10px] text-zinc-500 sm:text-xs">
              شركة الشحن
            </p>

            <p className="mt-0.5 break-words text-xs font-medium text-white sm:text-sm lg:text-base">
              {company}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-2.5 sm:gap-3">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 sm:h-5 sm:w-5" />

          <div className="min-w-0">
            <p className="text-[10px] text-zinc-500 sm:text-xs">
              عنوان التوصيل
            </p>

            <p className="mt-0.5 break-words text-xs font-medium leading-5 text-white sm:text-sm lg:text-base">
              {address}
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-3 sm:p-4">
          <p className="mb-1 text-[10px] text-zinc-500 sm:text-xs">
            رقم التتبع
          </p>

          <p className="break-all text-xs font-semibold text-[#A5B4FC] sm:text-sm">
            {trackingNumber}
          </p>
        </div>

        {/* Estimated Delivery */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-2.5 sm:p-3">
            <div className="mb-1.5 flex items-center gap-1.5 sm:gap-2">
              <CalendarDaysIcon className="h-3.5 w-3.5 text-zinc-500 sm:h-4 sm:w-4" />

              <span className="text-[10px] text-zinc-500 sm:text-xs">
                التاريخ
              </span>
            </div>

            <p className="text-[11px] font-medium text-white sm:text-xs lg:text-sm">
              {estimatedDate}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-[#1B1B1B] p-2.5 sm:p-3">
            <div className="mb-1.5 flex items-center gap-1.5 sm:gap-2">
              <ClockIcon className="h-3.5 w-3.5 text-zinc-500 sm:h-4 sm:w-4" />

              <span className="text-[10px] text-zinc-500 sm:text-xs">
                الوقت
              </span>
            </div>

            <p className="text-[11px] font-medium text-white sm:text-xs lg:text-sm">
              {estimatedTime}
            </p>
          </div>
        </div>
      </div>

      {/* Track Button */}
      <button
        type="button"
        onClick={handleTrackShipment}
        disabled={!order}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#A5B4FC] px-3 py-2.5 text-xs font-bold text-[#0E0E0E] transition hover:bg-[#C1C9FF] disabled:cursor-not-allowed disabled:opacity-50 sm:mt-5 sm:px-4 sm:py-3 sm:text-sm lg:mt-6"
      >
        <TruckIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        تتبع الشحنة
      </button>
    </div>
  );
};

export default DeliveryCard;