import {
  TruckIcon,
  MapPinIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const DeliveryCard = ({
  address = "شارع الملك فهد، الرياض، المملكة العربية السعودية",
  company = "Apex Express",
  trackingNumber = "TRK-84592318",
  estimatedDate = "15 أكتوبر 2024",
  estimatedTime = "10:00 ص - 2:00 م",
}) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#171717] p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#A5B4FC]/10">
          <TruckIcon className="h-6 w-6 text-[#A5B4FC]" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            معلومات التوصيل
          </h2>
          <p className="text-sm text-zinc-400">
            تفاصيل الشحنة الحالية
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5">
        {/* Company */}
        <div className="flex items-start gap-3">
          <TruckIcon className="mt-1 h-5 w-5 text-zinc-500" />

          <div>
            <p className="text-sm text-zinc-500">
              شركة الشحن
            </p>

            <p className="font-medium text-white">
              {company}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <MapPinIcon className="mt-1 h-5 w-5 text-zinc-500" />

          <div>
            <p className="text-sm text-zinc-500">
              عنوان التوصيل
            </p>

            <p className="text-white">
              {address}
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="rounded-xl bg-[#202020] p-4">
          <p className="text-sm text-zinc-500">
            رقم التتبع
          </p>

          <p className="mt-1 font-mono text-lg font-semibold text-[#A5B4FC]">
            {trackingNumber}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <CalendarDaysIcon className="mt-1 h-5 w-5 text-zinc-500" />

          <div>
            <p className="text-sm text-zinc-500">
              موعد الوصول المتوقع
            </p>

            <p className="text-white">
              {estimatedDate}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <ClockIcon className="mt-1 h-5 w-5 text-zinc-500" />

          <div>
            <p className="text-sm text-zinc-500">
              الفترة الزمنية
            </p>

            <p className="text-white">
              {estimatedTime}
            </p>
          </div>
        </div>
      </div>

      {/* Track Button */}
      <button
        className="mt-8 w-full rounded-xl bg-[#A5B4FC] px-4 py-3 font-semibold text-black transition hover:bg-[#8D9CF7]"
      >
        تتبع الشحنة
      </button>
    </div>
  );
};

export default DeliveryCard;